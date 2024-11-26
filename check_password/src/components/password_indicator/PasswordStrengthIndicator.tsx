import React from 'react';
// style
import './password_indicator.css';

interface PasswordStrengthIndicatorProps {
    colors: string[];
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ colors }) => {
    return (
        <div className='strength-indicators'>
            {
                colors.map((color, index) => (
                <div key={index} className='strength-indicator' style={{ backgroundColor: color }} />
              ))
            }
        </div>
    );
};

export default PasswordStrengthIndicator;
