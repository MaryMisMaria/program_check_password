import * as R from 'ramda';
import {useState} from 'react';
// icons
import {FaEye, FaEyeSlash} from 'react-icons/fa';
// style
import './check_password.css';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  
  // Toggle visibility of the instruction panel.
  const handleToggleInstruction = () => setShowInstruction(!showInstruction);
  
  // Toggle visibility of the password field.
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  
  // Function to calculate password strength
  const calculateStrength = password => {
    if (R.not(password)) return 'empty';
    if (R.or(R.lte(R.length(password), 8), R.equals(R.length(password), 8))) return 'short';
  
    // Validation rules for the password
    const rules = [
      /[a-zA-Z]/,
      /[0-9]/,
      /[!@#$%^&*(),.?":{}|<>]/,
    ];
  
    // Count how many rules the password satisfies.
    const countMatches = R.pipe(
      R.map(rule => rule.test(password)),
      R.filter(Boolean),
      R.length,
    );
  
    const strength = countMatches(rules);
  
    return R.cond([
      [R.equals(3), R.always('strong')],
      [R.equals(2), R.always('medium')],
      [R.equals(1), R.always('weak')],
      [R.T, R.always('weak')],
    ])(strength);
  };
  
  // Update state when the password input changes
  const handleChange = e => {
    const value = e.target.value;
    
    setPassword(value);
    setStrength(calculateStrength(value));
    setCopySuccess('');
  };
  
  // Copy the password to the clipboard.
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    .then(() => setCopySuccess('Password copied to clipboard!'))
    .catch(() => setCopySuccess('Failed to copy password.'));
  };
  
  // Get colors for the strength indicators based on password strength.
  const getStrengthColors = () => {
    switch (strength) {
      case 'empty':
        return ['gray', 'gray', 'gray'];
      case 'short':
        return ['red', 'red', 'red'];
      case 'weak':
        return ['red', 'gray', 'gray'];
      case 'medium':
        return ['#FF8C00', '#FF8C00', 'gray'];
      case 'strong':
        return ['green', 'green', 'green'];
      default:
        return ['gray', 'gray', 'gray'];
    }
  };
  
  const colors = getStrengthColors();
  
  return (
    <div className='password-strength-container'>
      <h1>Password Strength Checker</h1>
      <div className='password-input-container'>
        <div className='password-input-wrapper'>
          <input
            value={password}
            onChange={handleChange}
            className='password-input'
            placeholder='Enter your password'
            type={showPassword ? 'text' : 'password'}
          />
          <button
            className='password-toggle-btn'
            onClick={handleTogglePasswordVisibility}
          >
            {
              showPassword ? <FaEye size={20} title='Hide' /> : <FaEyeSlash size={20} title='Show' />
            }
          </button>
        </div>
        <button
          title='Show Instruction'
          className='show-info-btn'
          onClick={handleToggleInstruction}
        >
          Show Instruction
        </button>
      </div>
      {
        showInstruction && (
          <div className='instruction-panel'>
            <button className='close-btn' onClick={handleToggleInstruction}>
              &times;
            </button>
            <h2>Instructions</h2>
            <p>
              To create a strong password, follow these guidelines:
              <ul>
                <li>The password must be at least 8 characters long.</li>
                <li>A password will be considered weak if it contains only letters, digits, or symbols separately.</li>
                <li>A medium-strength password combines letters and digits, letters and symbols, or digits and symbols.
                </li>
                <li>For a strong password, use a combination of letters, digits, and special characters.</li>
              </ul>
            </p>
          </div>
        )}
      <div className='strength-indicators'>
        <div className='strength-indicator' style={{backgroundColor: colors[0]}} />
        <div className='strength-indicator' style={{backgroundColor: colors[1]}} />
        <div className='strength-indicator' style={{backgroundColor: colors[2]}} />
      </div>
      <div className='password-strength-message'>
        {
          R.equals(strength, 'empty') && <span>Enter a password to check its strength. Please use English.</span>
        }
        {
          R.equals(strength, 'short') && (
            <span className='warning-message'>Password is too short. Minimum 8 characters required.</span>
          )}
        {
          R.equals(strength, 'weak') && (
            <span className='warning-message'>Weak password. Add more variety of characters.</span>
          )}
        {
          R.equals(strength, 'medium') && (
            <span className='medium-message'>Medium password. Consider using more special characters.</span>
          )}
        {
          R.equals(strength, 'strong') && <span className='success-message'>Strong password. Great job!</span>
        }
      </div>
      <div className='copy-container'>
        <button
          className='copy-btn'
          onClick={copyToClipboard}
          disabled={strength !== 'strong'}
        >
          Copy Password
        </button>
        {
          copySuccess && <p className='copy-success-message'>{copySuccess}</p>
        }
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
