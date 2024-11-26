import React, { FC } from 'react';
// style
import './instruction_panel.css';

type InstructionPanelProps = {
    isVisible: boolean;
    onClose: () => void;
}

const InstructionPanel: FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className='instruction-panel'>
            <button className='close-btn' onClick={onClose}>
                &times;
            </button>
            <h2>Instructions</h2>
            <ul>
                <li>The password must be at least 8 characters long.</li>
                <li>Weak passwords contain only letters, numbers, or symbols.</li>
                <li>Medium passwords combine two of these categories.</li>
                <li>Strong passwords use letters, numbers, and symbols together.</li>
            </ul>
        </div>
    );
};

export default InstructionPanel;
