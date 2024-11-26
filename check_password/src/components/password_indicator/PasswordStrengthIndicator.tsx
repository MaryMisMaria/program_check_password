import React, { FC } from 'react';
// style
import './password_indicator.css';

type PasswordStrengthIndicatorProps = {
    colors: string[];
}

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = ({ colors }) => (
        <div className='strength-indicators'>
            {
                colors?.map((color, index) => (
                <div key={index} className='strength-indicator' style={{ backgroundColor: color }} />
              ))
            }
        </div>
    );

export default PasswordStrengthIndicator;
