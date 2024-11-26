import React from 'react';
import * as R from 'ramda';
// style
import './instruction_panel.css';

interface InstructionPanelProps {
    isVisible: boolean;
    onClose: () => void;
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ isVisible, onClose }) => {
    if (R.not(isVisible)) return null;

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
