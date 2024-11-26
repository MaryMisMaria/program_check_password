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

interface StrengthMessage {
    key: strength;
    message: string;
}

const App: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [copySuccess, setCopySuccess] = useState<string>('');
    const [strength, setStrength] = useState<strength>('empty');
    const [showInstruction, setShowInstruction] = useState<boolean>(false);

    const isPasswordEmpty: boolean = password?.trim().length === 0;

    const newPassword = useGeneratePassword();

    const { calculateStrength, getStrengthColors } = usePasswordStrength();

    const strengthMessages: StrengthMessage[] = [
        { key: 'empty', message: 'Enter a password to check its strength. Please use English.' },
        { key: 'short', message: 'Password is too short. Minimum 8 characters required.' },
        { key: 'weak', message: 'Weak password. Add more variety of characters.' },
        { key: 'medium', message: 'Medium password. Consider using more special characters.' },
        { key: 'strong', message: 'Strong password. Great job!' },
    ];

    const handleClose = (): void => {
        setShowInstruction(false);
    };

    const handleToggleInstruction = (): void => {
        setShowInstruction(prev => !prev);
    };

    const handlePasswordChange = (value: string): void => {
        setPassword(value);
        setStrength(calculateStrength(value));
        setCopySuccess('');
    };

    const copyToClipboard = (): void => {
        navigator.clipboard
            .writeText(password)
            .then(() => setCopySuccess('Password copied to clipboard!'))
            .catch(() => setCopySuccess('Failed to copy password.'));
    };

    const handleGeneratePassword = () => {
        if (isPasswordEmpty) {
            setPassword(newPassword);
            setStrength(calculateStrength(newPassword));
        }
    }

    return (
        <div className='password-strength-container'>
            <h1>Password Strength Checker</h1>
            <PasswordInput value={password} onChange={handlePasswordChange} />
            <InstructionPanel onClose={handleClose} isVisible={showInstruction} />
            <PasswordStrengthIndicator colors={getStrengthColors(strength)} />
            <ul className='password-strength-message' style={{ color: useTextColor(strength) }}>
                {
                    strengthMessages?.filter(msg => msg.key === strength)
                    ?.map(msg => (
                        <li key={msg.key}>{msg.message}</li>
                    ))
                }
            </ul>
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
                    onClick={handleGeneratePassword}
                />
            </div>
            {
                copySuccess && <p className='copy-success-message'>{copySuccess}</p>
            }
        </div>
    );
};

export default App;
