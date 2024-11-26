import { useMemo } from 'react';

const useTextColor = (strength: string): string => {
    return useMemo(() => {
        switch (strength) {
            case 'empty':
                return '#555';
            case 'short':
                return 'red';
            case 'weak':
                return 'red';
            case 'medium':
                return '#FF8C00';
            case 'strong':
                return 'green';
            default:
                return '#555';
        }
    }, [strength]);
};

export default useTextColor;
