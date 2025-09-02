import React, { useState } from 'react';
import CollectionForm from '../../library/form-view';
import { Calendar, Users, MapPin, CreditCard, FileText, Settings } from 'lucide-react';

const ComplexEventFormDemo: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const schema = {
    type: 'object',
    title: 'Event Registration Form',
    description: 'Complete multi-step event registration with advanced features',
    'x-layout': {
      main: {
        type: 'tabs',
        tabs: [
          { 
            id: 'event-details', 
            title: 'Event Details',
            icon: 'Calendar'
          },
          { 
            id: 'attendees', 
            title: 'Attendees',
            icon: 'Users'
          },
          { 
            id: 'preferences', 
            title: 'Preferences',
            icon: 'Settings'
          },
          { 
            id: 'payment', 
            title: 'Payment',
            icon: 'CreditCard'
          },
          { 
            id: 'review', 
            title: 'Review',
            icon: 'FileText'
          }
        ]
      }
    },
    properties: {
      // TAB 1: Event Details
      eventInfo: {
        type: 'object',
        title: 'Event Information',
        'x-layout-group': 'event-details',
        'x-display': 'accordion',
        'x-accordion-open': true,
        properties: {
          eventType: {
            type: 'string',
            title: 'Event Type',
            enum: ['Conference', 'Workshop', 'Seminar', 'Training', 'Meetup'],
            'x-control': 'select',
            'x-icon': 'Calendar',
            default: 'Conference'
          },
          eventName: {
            type: 'string',
            title: 'Event Name',
            'x-transform': ['titlecase'],
            'x-placeholder': 'Enter the event name',
            minLength: 5,
            maxLength: 100,
            rules: [
              {
                operation: 'not-empty',
                valueA: '{{eventInfo.eventType}}',
                action: 'show'
              }
            ]
          },
          eventDate: {
            type: 'string',
            format: 'date',
            title: 'Event Date',
            'x-control': 'date',
            'x-min-date': new Date().toISOString().split('T')[0],
            'x-max-date': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            rules: [
              {
                operation: 'not-empty',
                valueA: '{{eventInfo.eventName}}',
                action: 'show'
              }
            ]
          },
          eventTime: {
            type: 'string',
            format: 'time',
            title: 'Start Time',
            'x-control': 'time',
            rules: [
              {
                operation: 'not-empty',
                valueA: '{{eventInfo.eventDate}}',
                action: 'show'
              }
            ]
          },
          duration: {
            type: 'object',
            title: 'Event Duration',
            'x-collapsible': true,
            'x-collapsed': false,
            rules: [
              {
                operation: 'not-empty',
                valueA: '{{eventInfo.eventTime}}',
                action: 'show'
              }
            ],
            properties: {
              days: {
                type: 'number',
                title: 'Days',
                minimum: 0,
                maximum: 30,
                default: 1,
                'x-control-variant': 'slider'
              },
              hours: {
                type: 'number',
                title: 'Hours',
                minimum: 0,
                maximum: 24,
                default: 8,
                'x-control-variant': 'slider'
              }
            }
          }
        }
      },

      // Location Section
      location: {
        type: 'object',
        title: 'Event Location',
        'x-layout-group': 'event-details',
        'x-display': 'accordion',
        'x-icon': 'MapPin',
        properties: {
          format: {
            type: 'string',
            title: 'Event Format',
            enum: ['In-Person', 'Virtual', 'Hybrid'],
            'x-control': 'radio',
            default: 'In-Person'
          },
          venue: {
            type: 'object',
            title: 'Venue Details',
            rules: [
              {
                operation: 'not-equals',
                valueA: '{{location.format}}',
                valueB: 'Virtual',
                action: 'show'
              }
            ],
            properties: {
              name: {
                type: 'string',
                title: 'Venue Name',
                'x-placeholder': 'e.g., Convention Center'
              },
              address: {
                type: 'string',
                title: 'Street Address',
                'x-control': 'textarea',
                'x-rows': 2
              },
              city: {
                type: 'string',
                title: 'City',
                'x-transform': ['titlecase']
              },
              state: {
                type: 'string',
                title: 'State/Province'
              },
              country: {
                type: 'string',
                title: 'Country',
                enum: ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia', 'Other'],
                'x-control': 'select'
              },
              postalCode: {
                type: 'string',
                title: 'Postal Code',
                pattern: '^[A-Za-z0-9\\s-]{3,10}$'
              }
            }
          },
          virtualPlatform: {
            type: 'object',
            title: 'Virtual Platform',
            rules: [
              {
                operation: 'not-equals',
                valueA: '{{location.format}}',
                valueB: 'In-Person',
                action: 'show'
              }
            ],
            properties: {
              platform: {
                type: 'string',
                title: 'Platform',
                enum: ['Zoom', 'Teams', 'Google Meet', 'Webex', 'Custom'],
                'x-control': 'select'
              },
              meetingUrl: {
                type: 'string',
                title: 'Meeting URL',
                format: 'uri',
                'x-placeholder': 'https://...'
              },
              accessCode: {
                type: 'string',
                title: 'Access Code',
                'x-control': 'password'
              }
            }
          }
        }
      },

      // TAB 2: Attendees
      attendees: {
        type: 'object',
        title: 'Attendee Information',
        'x-layout-group': 'attendees',
        properties: {
          registrationType: {
            type: 'string',
            title: 'Registration Type',
            enum: ['Individual', 'Group', 'Corporate'],
            'x-control': 'buttongroup',
            default: 'Individual'
          },
          numberOfAttendees: {
            type: 'number',
            title: 'Number of Attendees',
            minimum: 1,
            maximum: 100,
            default: 1,
            rules: [
              {
                operation: 'not-equals',
                valueA: '{{attendees.registrationType}}',
                valueB: 'Individual',
                action: 'show'
              }
            ]
          },
          primaryContact: {
            type: 'object',
            title: 'Primary Contact',
            'x-icon': 'User',
            properties: {
              firstName: {
                type: 'string',
                title: 'First Name',
                'x-transform': ['titlecase'],
                minLength: 2
              },
              lastName: {
                type: 'string',
                title: 'Last Name',
                'x-transform': ['titlecase'],
                minLength: 2
              },
              email: {
                type: 'string',
                title: 'Email',
                format: 'email',
                'x-control': 'email',
                'x-transform': ['lowercase']
              },
              phone: {
                type: 'string',
                title: 'Phone',
                'x-control': 'phone',
                'x-mask': '(999) 999-9999'
              },
              jobTitle: {
                type: 'string',
                title: 'Job Title',
                'x-transform': ['titlecase']
              },
              company: {
                type: 'string',
                title: 'Company/Organization',
                rules: [
                  {
                    operation: 'equals',
                    valueA: '{{attendees.registrationType}}',
                    valueB: 'Corporate',
                    action: 'show'
                  }
                ]
              }
            }
          },
          additionalAttendees: {
            type: 'array',
            title: 'Additional Attendees',
            'x-display': 'table',
            rules: [
              {
                operation: 'greater-than',
                valueA: '{{attendees.numberOfAttendees}}',
                valueB: 1,
                action: 'show'
              }
            ],
            items: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  title: 'First Name',
                  'x-transform': ['titlecase']
                },
                lastName: {
                  type: 'string',
                  title: 'Last Name',
                  'x-transform': ['titlecase']
                },
                email: {
                  type: 'string',
                  title: 'Email',
                  format: 'email',
                  'x-transform': ['lowercase']
                },
                dietaryRestrictions: {
                  type: 'array',
                  title: 'Dietary Restrictions',
                  items: {
                    type: 'string',
                    enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher', 'Halal', 'None']
                  },
                  'x-control': 'selectmany'
                }
              }
            }
          }
        }
      },

      // TAB 3: Preferences
      preferences: {
        type: 'object',
        title: 'Event Preferences',
        'x-layout-group': 'preferences',
        properties: {
          sessions: {
            type: 'object',
            title: 'Session Preferences',
            'x-display': 'accordion',
            'x-accordion-open': true,
            properties: {
              trackPreference: {
                type: 'array',
                title: 'Preferred Tracks',
                items: {
                  type: 'string',
                  enum: ['Technical', 'Business', 'Design', 'Marketing', 'Leadership', 'Innovation']
                },
                'x-control': 'selectmany',
                'x-control-variant': 'checkbox',
                uniqueItems: true
              },
              sessionFormat: {
                type: 'string',
                title: 'Preferred Session Format',
                enum: ['Keynotes', 'Workshops', 'Panel Discussions', 'Networking', 'All'],
                'x-control': 'radio',
                default: 'All'
              },
              specialInterests: {
                type: 'string',
                title: 'Special Interests or Topics',
                'x-control': 'textarea',
                'x-rows': 3,
                'x-placeholder': 'Tell us about specific topics you\'d like to see covered...'
              }
            }
          },
          accommodations: {
            type: 'object',
            title: 'Accommodations',
            'x-display': 'accordion',
            properties: {
              needsAccommodation: {
                type: 'boolean',
                title: 'Do you require special accommodations?',
                'x-control': 'switch',
                default: false
              },
              accommodationType: {
                type: 'array',
                title: 'Type of Accommodation',
                rules: [
                  {
                    operation: 'equals',
                    valueA: '{{preferences.accommodations.needsAccommodation}}',
                    valueB: true,
                    action: 'show'
                  }
                ],
                items: {
                  type: 'string',
                  enum: [
                    'Wheelchair Access',
                    'Sign Language Interpretation',
                    'Large Print Materials',
                    'Hearing Loop',
                    'Service Animal',
                    'Other'
                  ]
                },
                'x-control': 'selectmany',
                'x-control-variant': 'checkbox'
              },
              accommodationDetails: {
                type: 'string',
                title: 'Additional Details',
                'x-control': 'textarea',
                'x-rows': 3,
                rules: [
                  {
                    operation: 'contains',
                    valueA: '{{preferences.accommodations.accommodationType}}',
                    valueB: 'Other',
                    action: 'show'
                  }
                ]
              }
            }
          },
          networking: {
            type: 'object',
            title: 'Networking Preferences',
            'x-collapsible': true,
            properties: {
              participateInNetworking: {
                type: 'boolean',
                title: 'Interested in networking events?',
                'x-control': 'switch',
                default: true
              },
              networkingGoals: {
                type: 'array',
                title: 'Networking Goals',
                rules: [
                  {
                    operation: 'equals',
                    valueA: '{{preferences.networking.participateInNetworking}}',
                    valueB: true,
                    action: 'show'
                  }
                ],
                items: {
                  type: 'string',
                  enum: [
                    'Find potential clients',
                    'Meet industry peers',
                    'Learn from experts',
                    'Find job opportunities',
                    'Share knowledge',
                    'Build partnerships'
                  ]
                },
                'x-control': 'selectmany'
              },
              linkedinProfile: {
                type: 'string',
                title: 'LinkedIn Profile',
                format: 'uri',
                'x-placeholder': 'https://linkedin.com/in/...',
                rules: [
                  {
                    operation: 'equals',
                    valueA: '{{preferences.networking.participateInNetworking}}',
                    valueB: true,
                    action: 'show'
                  }
                ]
              }
            }
          }
        }
      },

      // TAB 4: Payment
      payment: {
        type: 'object',
        title: 'Payment Information',
        'x-layout-group': 'payment',
        properties: {
          ticketType: {
            type: 'string',
            title: 'Ticket Type',
            enum: ['Early Bird', 'Regular', 'VIP', 'Student'],
            'x-control': 'radio',
            default: 'Regular'
          },
          pricing: {
            type: 'object',
            title: 'Pricing Details',
            'x-display': 'info',
            properties: {
              basePrice: {
                type: 'number',
                title: 'Base Price',
                readOnly: true,
                'x-prefix': '$',
                rules: [
                  {
                    operation: 'equals',
                    valueA: '{{payment.ticketType}}',
                    valueB: 'Early Bird',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: 199 }
                    ]
                  },
                  {
                    operation: 'equals',
                    valueA: '{{payment.ticketType}}',
                    valueB: 'Regular',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: 299 }
                    ]
                  },
                  {
                    operation: 'equals',
                    valueA: '{{payment.ticketType}}',
                    valueB: 'VIP',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: 599 }
                    ]
                  },
                  {
                    operation: 'equals',
                    valueA: '{{payment.ticketType}}',
                    valueB: 'Student',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: 99 }
                    ]
                  }
                ]
              },
              quantity: {
                type: 'number',
                title: 'Quantity',
                readOnly: true,
                rules: [
                  {
                    operation: 'not-empty',
                    valueA: '{{attendees.numberOfAttendees}}',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: '{{attendees.numberOfAttendees}}' }
                    ]
                  }
                ]
              },
              subtotal: {
                type: 'number',
                title: 'Subtotal',
                readOnly: true,
                'x-prefix': '$',
                rules: [
                  {
                    operation: 'not-empty',
                    valueA: '{{payment.pricing.basePrice}}',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: '{{payment.pricing.basePrice * payment.pricing.quantity}}' }
                    ]
                  }
                ]
              },
              promoCode: {
                type: 'string',
                title: 'Promo Code',
                'x-transform': ['uppercase'],
                'x-placeholder': 'Enter promo code'
              },
              discount: {
                type: 'number',
                title: 'Discount',
                readOnly: true,
                'x-prefix': '$',
                rules: [
                  {
                    operation: 'equals',
                    valueA: '{{payment.pricing.promoCode}}',
                    valueB: 'SAVE20',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: '{{payment.pricing.subtotal * 0.20}}' }
                    ]
                  },
                  {
                    operation: 'equals',
                    valueA: '{{payment.pricing.promoCode}}',
                    valueB: 'MEMBER10',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: '{{payment.pricing.subtotal * 0.10}}' }
                    ]
                  }
                ]
              },
              total: {
                type: 'number',
                title: 'Total Amount',
                readOnly: true,
                'x-prefix': '$',
                'x-class': 'font-bold text-lg',
                rules: [
                  {
                    operation: 'not-empty',
                    valueA: '{{payment.pricing.subtotal}}',
                    action: 'set-property',
                    property: [
                      { key: 'default', value: '{{payment.pricing.subtotal - (payment.pricing.discount || 0)}}' }
                    ]
                  }
                ]
              }
            }
          },
          billingInfo: {
            type: 'object',
            title: 'Billing Information',
            'x-collapsible': true,
            properties: {
              cardholderName: {
                type: 'string',
                title: 'Cardholder Name',
                'x-transform': ['titlecase']
              },
              cardNumber: {
                type: 'string',
                title: 'Card Number',
                'x-control': 'text',
                'x-mask': '9999 9999 9999 9999',
                pattern: '^[0-9]{13,19}$'
              },
              expiryDate: {
                type: 'string',
                title: 'Expiry Date',
                'x-mask': '99/99',
                'x-placeholder': 'MM/YY',
                pattern: '^(0[1-9]|1[0-2])\\/[0-9]{2}$'
              },
              cvv: {
                type: 'string',
                title: 'CVV',
                'x-control': 'password',
                'x-mask': '999',
                pattern: '^[0-9]{3,4}$'
              },
              billingAddress: {
                type: 'object',
                title: 'Billing Address',
                properties: {
                  sameAsVenue: {
                    type: 'boolean',
                    title: 'Same as venue address',
                    'x-control': 'checkbox',
                    rules: [
                      {
                        operation: 'equals',
                        valueA: '{{location.format}}',
                        valueB: 'In-Person',
                        action: 'show'
                      }
                    ]
                  },
                  street: {
                    type: 'string',
                    title: 'Street Address',
                    rules: [
                      {
                        operation: 'not-equals',
                        valueA: '{{payment.billingInfo.billingAddress.sameAsVenue}}',
                        valueB: true,
                        action: 'show'
                      }
                    ]
                  },
                  city: {
                    type: 'string',
                    title: 'City',
                    'x-transform': ['titlecase'],
                    rules: [
                      {
                        operation: 'not-equals',
                        valueA: '{{payment.billingInfo.billingAddress.sameAsVenue}}',
                        valueB: true,
                        action: 'show'
                      }
                    ]
                  },
                  state: {
                    type: 'string',
                    title: 'State',
                    rules: [
                      {
                        operation: 'not-equals',
                        valueA: '{{payment.billingInfo.billingAddress.sameAsVenue}}',
                        valueB: true,
                        action: 'show'
                      }
                    ]
                  },
                  postalCode: {
                    type: 'string',
                    title: 'Postal Code',
                    rules: [
                      {
                        operation: 'not-equals',
                        valueA: '{{payment.billingInfo.billingAddress.sameAsVenue}}',
                        valueB: true,
                        action: 'show'
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      },

      // TAB 5: Review & Submit
      review: {
        type: 'object',
        title: 'Review & Confirmation',
        'x-layout-group': 'review',
        properties: {
          summary: {
            type: 'null',
            title: 'Registration Summary',
            'x-control': 'paragraph',
            'x-content': 'Please review your registration details before submitting.',
            'x-class': 'text-lg font-semibold mb-4'
          },
          termsAndConditions: {
            type: 'object',
            title: 'Terms & Conditions',
            properties: {
              agreeToTerms: {
                type: 'boolean',
                title: 'I agree to the terms and conditions',
                'x-control': 'checkbox',
                'x-validation': {
                  required: true,
                  message: 'You must agree to the terms and conditions'
                }
              },
              agreeToPrivacy: {
                type: 'boolean',
                title: 'I agree to the privacy policy',
                'x-control': 'checkbox',
                'x-validation': {
                  required: true,
                  message: 'You must agree to the privacy policy'
                }
              },
              subscribeToNewsletter: {
                type: 'boolean',
                title: 'Subscribe to our newsletter for event updates',
                'x-control': 'checkbox',
                default: true
              }
            }
          },
          additionalNotes: {
            type: 'string',
            title: 'Additional Notes or Special Requests',
            'x-control': 'textarea',
            'x-rows': 4,
            'x-placeholder': 'Any additional information you\'d like us to know...',
            maxLength: 500
          },
          confirmationEmail: {
            type: 'string',
            title: 'Send confirmation to',
            format: 'email',
            'x-control': 'email',
            readOnly: true,
            rules: [
              {
                operation: 'not-empty',
                valueA: '{{attendees.primaryContact.email}}',
                action: 'set-property',
                property: [
                  { key: 'default', value: '{{attendees.primaryContact.email}}' }
                ]
              }
            ]
          }
        }
      }
    },
    required: [
      'eventInfo.eventType',
      'eventInfo.eventName',
      'eventInfo.eventDate',
      'attendees.primaryContact.firstName',
      'attendees.primaryContact.lastName',
      'attendees.primaryContact.email',
      'payment.ticketType'
    ]
  };

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Event registration submitted successfully!');
  };

  const handleChange = (data: any) => {
    setFormData(data);
    console.log('Form data updated:', data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complex Event Registration Form</h1>
          <p className="text-gray-600 dark:text-gray-400">
            This demonstrates a comprehensive multi-page form with tabs, accordions, conditional logic, 
            calculations, transforms, and validations - all driven by JSON Schema.
          </p>
        </div>

        <CollectionForm
          schema={schema}
          data={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          id="complex-event-form"
        />

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Features Demonstrated:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Layout Features:</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Multi-tab layout</li>
                <li>Accordion sections</li>
                <li>Collapsible groups</li>
                <li>Table display for arrays</li>
                <li>Icons and styling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Dynamic Features:</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Conditional visibility rules</li>
                <li>Calculated fields (pricing)</li>
                <li>Text transforms (uppercase, titlecase)</li>
                <li>Input masks (phone, card)</li>
                <li>Dynamic validation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        <details className="mt-8">
          <summary className="cursor-pointer font-semibold">View Form Data (Debug)</summary>
          <pre className="mt-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-auto text-xs">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default ComplexEventFormDemo;