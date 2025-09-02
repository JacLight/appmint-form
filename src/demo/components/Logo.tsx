import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <img 
      src="/images/appmint_icon.png" 
      alt="AppMint Form Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => {
  return (
    <img 
      src="/images/appmint_icon.png" 
      alt="AppMint"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;