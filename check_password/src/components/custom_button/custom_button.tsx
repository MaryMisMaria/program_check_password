import React from 'react';
// style
import './custom_button.css'

interface CustomButtonProps {
    text: string;
    title: string;
    disabled?: boolean;
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, disabled = false, title }) => {
    return (
        <button
            title={title}
            onClick={onClick}
            disabled={disabled}
            className='custom_btn'
        >
            {text}
        </button>
    );
};

export default CustomButton;
