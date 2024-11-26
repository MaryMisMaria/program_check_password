import React, { useState } from 'react';
// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// style
import './password_input.css';

interface PasswordInputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, onChange, placeholder}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className='password-input-wrapper'>
            <input
                value={value}
                className='password-input'
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Enter your password'}
            />
            <button
                type='button'
                className='password-toggle-btn'
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {
                    showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>
                }
            </button>
        </div>
    );
};

export default PasswordInput;
