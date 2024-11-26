import React, { FC, useState } from 'react';
// components
import CustomButton from './components/custom_button/custom_button';
import PasswordInput from './components/password_input/PasswordInput';
import InstructionPanel from './components/instruction_panel/InstructionPanel';
import PasswordStrengthIndicator from './components/password_indicator/PasswordStrengthIndicator';
// hooks
import useTextColor from './hooks/useTextColor';
import useGeneratePassword from './hooks/useGeneratePassword';
import { strength, usePasswordStrength } from './hooks/usePasswordStrench';
// style
import './App.css';

const App: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [copySuccess, setCopySuccess] = useState<string>('');
    const [strength, setStrength] = useState<strength>('empty');
    const [showInstruction, setShowInstruction] = useState<boolean>(false);

    const isPasswordEmpty = password?.trim().length === 0;

    const { calculateStrength, getStrengthColors } = usePasswordStrength();

    const handleClose = () => setShowInstruction(false)

    const handleToggleInstruction = () => setShowInstruction(!showInstruction);

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setStrength(calculateStrength(value));
        setCopySuccess('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password)
            .then(() => setCopySuccess('Password copied to clipboard!'))
            .catch(() => setCopySuccess('Failed to copy password.'));
    };

    return (
        <div className='password-strength-container'>
            <h1>Password Strength Checker</h1>
            <PasswordInput value={password} onChange={handlePasswordChange} />
            <InstructionPanel onClose={handleClose} isVisible={showInstruction} />
            <PasswordStrengthIndicator colors={getStrengthColors(strength)} />
            <div className='password-strength-message' style={{color: useTextColor(strength)}}>
                {
                    strength === 'empty' && (
                        <span>Enter a password to check its strength. Please use English.</span>
                    )
                }
                {
                    strength === 'short' && (
                        <span>Password is too short. Minimum 8 characters required.</span>
                    )
                }
                {
                    strength === 'weak' && (
                        <span>Weak password. Add more variety of characters.</span>
                    )
                }
                {
                    strength === 'medium' && (
                        <span>Medium password. Consider using more special characters.</span>
                    )
                }
                {
                    strength === 'strong' && (
                        <span>Strong password. Great job!</span>
                    )
                }
            </div>
            <div className='wrapper-button'>
                <CustomButton
                    text='Copy Password'
                    onClick={copyToClipboard}
                    title='Copy your password'
                    disabled={strength !== 'strong'}
                />
                <CustomButton
                    disabled={false}
                    text='Show Instructions'
                    onClick={handleToggleInstruction}
                    title='Toggle password instructions'
                />
                <CustomButton
                    text='Generate Password'
                    disabled={!isPasswordEmpty}
                    title='Generate a new password'
                    onClick={() => {
                        if (isPasswordEmpty) {
                            const newPassword = useGeneratePassword();
                            setPassword(newPassword);
                            setStrength(calculateStrength(newPassword));
                        }
                    }}
                />
            </div>
            {
                copySuccess && <p className='copy-success-message'>{copySuccess}</p>
            }
        </div>
    );
};

export default App;
