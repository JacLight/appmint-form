import React, { useState, useEffect, useRef } from 'react';
import { StyledComponent } from './styling';
import { twMerge } from 'tailwind-merge';
import { countries, getCountryDropDownOptions } from '../data';

// Helper function to get placeholder based on country code
const getPlaceholderForCountry = (countryCode: string): string => {
  const placeholders: { [key: string]: string } = {
    '+1': '(555) 123-4567',     // US/Canada
    '+44': '7700 900123',       // UK
    '+33': '06 12 34 56 78',    // France
    '+49': '0151 12345678',     // Germany
    '+81': '090-1234-5678',     // Japan
    '+86': '138 0013 8000',     // China
    '+91': '98765 43210',       // India
    '+61': '0412 345 678',      // Australia
    '+7': '912 345-67-89',      // Russia
    '+55': '(11) 99999-9999',   // Brazil
  };
  
  return placeholders[countryCode] || '123 456 7890';
};

interface PhoneElementProps {
  update?: (value: string) => void;
  change?: (value: string) => void;
  blur?: (value: string) => void;
  focus?: () => void;
  mode?: string;
  schema?: any;
  path?: string;
  name?: string;
  data?: string;
  value?: string;
  theme?: any;
  className?: string;
}

export const PhoneElement: React.FC<PhoneElementProps> = props => {
  // State for phone value and country code
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+1'); // Default to US
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update value when props.data or props.value changes
  useEffect(() => {
    if (props.value) {
      const normalized = normalizePhoneInput(props.value);
      const [code, number] = getPhoneParts(normalized);
      setCountryCode(code);
      setPhoneValue(number);
    }
  }, [props.value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatPhoneInput(rawValue);
    setPhoneValue(formattedValue);

    // Validate the phone number
    const fullPhone = `${countryCode} ${formattedValue}`;
    const valid = validatePhoneNumber(fullPhone);
    setIsValid(valid);

    // Notify parent component of change
    if (props.change) {
      props.change(fullPhone);
    }
    if (props.update) {
      props.update(fullPhone);
    }
  };

  // Handle blur event
  const handleBlur = () => {
    const fullPhone = `${countryCode} ${phoneValue}`;
    const valid = validatePhoneNumber(fullPhone);
    setIsValid(valid);
    
    if (props.blur) {
      props.blur(fullPhone);
    }
  };

  // Handle focus event
  const handleFocus = () => {
    if (props.focus) {
      props.focus();
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Select country code
  const selectCountryCode = (code: string) => {
    setCountryCode(code);
    setIsDropdownOpen(false);

    // Validate with new country code
    const fullPhone = `${code} ${phoneValue}`;
    const valid = validatePhoneNumber(fullPhone);
    setIsValid(valid);

    // Notify parent component of change
    if (props.change) {
      props.change(fullPhone);
    }
    if (props.update) {
      props.update(fullPhone);
    }
  };

  const countries = getCountryDropDownOptions();
  const country = countries.find(c => '+' + c.phone === countryCode) || {
    label: 'United States',
    value: 'us',
    phone: '1',
    flag: '🇺🇸',
  };

  return (
    <div className="relative">
      <StyledComponent
        componentType="phone"
        part="container"
        schema={props.schema}
        theme={props.theme}
        className={twMerge('flex items-center', props.className)}
      >
        <StyledComponent
          componentType="phone"
          part="dropdownButton"
          schema={props.schema}
          theme={props.theme}
          as="button"
          type="button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {country.flag || '🇺🇸'} {/* Fallback to US flag if not available */}
          {countryCode}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </StyledComponent>

        <StyledComponent
          componentType="phone"
          part="input"
          schema={props.schema}
          theme={props.theme}
          as="input"
          type="text"
          id="phone-input"
          className={twMerge(
            "block p-2.5 w-full z-20 text-sm bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
            isValid ? "text-gray-900" : "text-red-600 border-red-300"
          )}
          placeholder={getPlaceholderForCountry(countryCode)}
          value={phoneValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
        />
      </StyledComponent>

      {/* Validation message */}
      {!isValid && phoneValue && (
        <StyledComponent
          componentType="phone"
          part="errorMessage"
          schema={props.schema}
          theme={props.theme}
          className="mt-1 text-sm text-red-600"
        >
          Please enter a valid phone number
        </StyledComponent>
      )}

      {isDropdownOpen && (
        <StyledComponent
          componentType="phone"
          part="dropdownMenu"
          schema={props.schema}
          theme={props.theme}
          className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 top-full max-h-96 overflow-y-auto"
          ref={dropdownRef}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-phone-button"
          >
            {getCountryDropDownOptions().map(country => (
              <li key={country.value}>
                <StyledComponent
                  componentType="phone"
                  part="dropdownItem"
                  schema={props.schema}
                  theme={props.theme}
                  as="button"
                  type="button"
                  className={twMerge(
                    'inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
                    countryCode === country.value ? 'bg-gray-100' : ''
                  )}
                  role="menuitem"
                  onClick={() => selectCountryCode('+' + country.phone)}
                >
                  <div className="inline-flex items-center  gap-2 truncate">
                    {country.flag}
                    {country.label} +{country.phone}
                  </div>
                </StyledComponent>
              </li>
            ))}
          </ul>
        </StyledComponent>
      )}
    </div>
  );
};

// Helper function to clean phone number input
const cleanPhoneNumber = (input: string): string => {
  // Remove all non-digit characters except + at the beginning
  return input.replace(/[^\d+]/g, '');
};

// Helper function to format phone input as user types
const formatPhoneInput = (input: string): string => {
  // Keep only digits, spaces, hyphens, parentheses, and plus signs
  let cleaned = input.replace(/[^\d\s\-\(\)\+]/g, '');
  
  // If user is entering with their own formatting, preserve it initially
  if (input.includes('(') || input.includes(' ') || input.includes('-')) {
    return cleaned;
  }
  
  // Auto-format for clean digit-only input (US style)
  const digits = cleaned.replace(/\D/g, '');
  
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
};

// Helper function to validate phone number
const validatePhoneNumber = (fullPhone: string): boolean => {
  if (!fullPhone || fullPhone.trim() === '') return true; // Empty is valid (optional field)
  
  // Clean the phone number
  const cleaned = cleanPhoneNumber(fullPhone);
  
  if (!cleaned) return false;
  
  // Extract country code and local number
  const [countryCode, localNumber] = getPhoneParts(fullPhone);
  
  if (!localNumber) return false;
  
  // Clean local number for validation
  const localDigits = localNumber.replace(/\D/g, '');
  
  // Country-specific validation rules
  const countryValidation: { [key: string]: { min: number; max: number } } = {
    '+1': { min: 10, max: 10 },   // US/Canada: exactly 10 digits
    '+44': { min: 10, max: 11 },  // UK: 10-11 digits
    '+33': { min: 9, max: 10 },   // France: 9-10 digits
    '+49': { min: 10, max: 12 },  // Germany: 10-12 digits
    '+81': { min: 10, max: 11 },  // Japan: 10-11 digits
    '+86': { min: 11, max: 11 },  // China: exactly 11 digits
    '+91': { min: 10, max: 10 },  // India: exactly 10 digits
    '+61': { min: 9, max: 9 },    // Australia: exactly 9 digits
    '+7': { min: 10, max: 10 },   // Russia: exactly 10 digits
    '+55': { min: 10, max: 11 },  // Brazil: 10-11 digits
  };
  
  const rules = countryValidation[countryCode];
  if (rules) {
    return localDigits.length >= rules.min && localDigits.length <= rules.max;
  }
  
  // Default validation for other countries (ITU-T E.164 standard)
  // Local number should be 4-14 digits
  return localDigits.length >= 4 && localDigits.length <= 14;
};

const allPhoneCodes = getCountryDropDownOptions().map(
  country => '+' + country.phone
);

export const getPhoneParts = (phone: string): string[] => {
  if (!phone) return ['+1', ''];

  // Clean the input first
  const cleaned = cleanPhoneNumber(phone.trim());
  
  if (!cleaned) return ['+1', ''];

  let code = '+1'; // Default
  let number = '';

  // Try to match with known country codes, starting with longest codes first
  const sortedCodes = [...allPhoneCodes].sort((a, b) => b.length - a.length);
  
  for (const countryCode of sortedCodes) {
    if (cleaned.startsWith(countryCode)) {
      code = countryCode;
      number = cleaned.slice(countryCode.length);
      break;
    }
  }
  
  // If no country code found, assume it's a local number
  if (code === '+1' && cleaned !== phone.trim()) {
    // If the cleaned version differs from original, it had a + but no matching code
    if (cleaned.startsWith('+')) {
      // Extract what looks like a country code (1-4 digits after +)
      const match = cleaned.match(/^\+(\d{1,4})(\d*)$/);
      if (match) {
        const potentialCode = '+' + match[1];
        if (allPhoneCodes.includes(potentialCode)) {
          code = potentialCode;
          number = match[2];
        } else {
          // Invalid code, treat whole thing as number with default country
          number = cleaned.replace(/^\+/, '');
        }
      }
    } else {
      // No + sign, treat as local number
      number = cleaned;
    }
  }
  
  return [code, number];
};

// Enhanced helper to handle various phone input formats
export const normalizePhoneInput = (input: string): string => {
  if (!input) return '';
  
  // Handle common input formats and normalize them
  let normalized = input.trim();
  
  // Remove common prefixes
  normalized = normalized.replace(/^tel:/, '');
  normalized = normalized.replace(/^phone:/, '');
  
  // Handle parentheses format like (555) 123-4567
  normalized = normalized.replace(/^\((\d+)\)\s*/, '+1$1');
  
  // Handle format like 555.123.4567
  normalized = normalized.replace(/\./g, '');
  
  // Handle multiple spaces
  normalized = normalized.replace(/\s+/g, ' ');
  
  // If it starts with just digits and is US length, assume +1
  if (/^\d{10}$/.test(normalized.replace(/\D/g, ''))) {
    const digits = normalized.replace(/\D/g, '');
    if (digits.length === 10) {
      normalized = '+1 ' + normalized;
    }
  }
  
  return normalized;
};
