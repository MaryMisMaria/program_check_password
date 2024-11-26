import React, { useState } from 'react';
// components
import CustomButton from './components/custom_button/custom_button';
import PasswordInput from './components/password_input/PasswordInput';
import InstructionPanel from './components/instruction_panel/InstructionPanel';
import PasswordStrengthIndicator from './components/password_indicator/PasswordStrengthIndicator';
// hooks
import useTextColor from './hooks/useTextColor';
import { generatePassword } from './hooks/useGeneratePassword';
import { strength, usePasswordStrength } from './hooks/usePasswordStrench';
// style
import './App.css';

const App: React.FC = () => {
    const [password, setPassword] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [strength, setStrength] = useState<strength>('empty');
    const [showInstruction, setShowInstruction] = useState(false);

    const isPasswordEmpty = password.trim().length === 0;

    const { calculateStrength, getStrengthColors } = usePasswordStrength();

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
            <InstructionPanel
                isVisible={showInstruction}
                onClose={() => setShowInstruction(false)}
            />
            <PasswordStrengthIndicator colors={getStrengthColors(strength)} />
            <div className="password-strength-message" style={{ color: useTextColor(strength) }}>
                {
                    strength === 'empty' && (
                    <span>Enter a password to check its strength. Please use English.</span>
                )}
                {
                    strength === 'short' && (
                    <span>Password is too short. Minimum 8 characters required.</span>
                )}
                {
                    strength === 'weak' && (
                    <span>Weak password. Add more variety of characters.</span>
                )}
                {
                    strength === 'medium' && (
                    <span>Medium password. Consider using more special characters.</span>
                )}
                {
                    strength === 'strong' && (
                    <span>Strong password. Great job!</span>
                )}
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
                    title='Toggle password instructions'
                    onClick={() => setShowInstruction(!showInstruction)}
                />
                <CustomButton
                    text='Generate Password'
                    title='Generate a new password'
                    disabled={!isPasswordEmpty}
                    onClick={() => {
                        if (isPasswordEmpty) {
                            const newPassword = generatePassword();
                            setPassword(newPassword);
                            setStrength(calculateStrength(newPassword));
                        }}
                    }
                />
            </div>
            {
                copySuccess && <p className='copy-success-message'>{copySuccess}</p>
            }
        </div>
    );
};

export default App;
