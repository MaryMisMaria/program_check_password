import React, { FC } from 'react';
// style
import './custom_button.css'

type CustomButtonProps = {
    text: string;
    title: string;
    disabled?: boolean;
    onClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ text,  title, onClick, disabled = false }) => (
        <button
            title={title}
            onClick={onClick}
            disabled={disabled}
            className='custom_btn'
        >
            {text}
        </button>
    );

export default CustomButton;
