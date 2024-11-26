import React, { FC } from 'react';
// style
import './instruction_panel.css';

type InstructionPanelProps = {
    isVisible: boolean;
    onClose: () => void;
}

const instructions = [
    'The password must be at least 8 characters long.',
    'Weak passwords contain only letters, numbers, or symbols.',
    'Medium passwords combine two of these categories.',
    'Strong passwords use letters, numbers, and symbols together.'
];

const InstructionPanel: FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className='instruction-panel'>
            <button
                onClick={onClose}
                className='close-btn'
                aria-label='Close instructions'
            >
                &times;
            </button>
            <h2>Instructions</h2>
                <ul>
                    {
                        instructions?.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))
                    }
                </ul>
        </div>
    );
};

export default InstructionPanel;
