import * as R from 'ramda';

export type strength = 'empty' | 'short' | 'weak' | 'medium' | 'strong';

export const usePasswordStrength = () => {
    const calculateStrength = (password: string): strength => {
        if (R.not(password)) return 'empty';

        if (R.lt(R.length(password), 8)) return 'short';

        if (R.equals(R.length(password), 8)) return 'weak';

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const matches = [hasLetters, hasNumbers, hasSymbols].filter(Boolean).length;

        if (matches === 3) return 'strong';
        if (matches === 2) return 'medium';
        return 'weak';
    };

    const getStrengthColors = (strength: strength): string[] => {
        switch (strength) {
            case 'empty':
                return ['gray', 'gray', 'gray'];
            case 'short':
                return ['red', 'red', 'red'];
            case 'weak':
                return ['red', 'gray', 'gray'];
            case 'medium':
                return ['orange', 'orange', 'gray'];
            case 'strong':
                return ['green', 'green', 'green'];
            default:
                return ['gray', 'gray', 'gray'];
        }
    };

    return { calculateStrength, getStrengthColors };
};
