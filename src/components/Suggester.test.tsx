import { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Table } from './Table';
import type { VTLExpression } from '../types';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { nomenclatureCache } from '../utils/nomenclatureCacheService';
import { Suggester } from './Suggester';
import { Interpreter } from '../utils/vtl';

vi.mock('../utils/nomenclatureCacheService', () => ({
    nomenclatureCache: {
        getLabelFromCache: vi.fn(),
    },
}));
vi.mock('@react-pdf/renderer', () => ({
    Text: ({ children, style }: any) => <span data-testid="pdf-text" style={style}>{children}</span>,
    View: ({ children, style }: any) => <div data-testid="pdf-view" style={style}>{children}</div>,
    StyleSheet: {
        create: (styles: any) => styles,
    },
}));


vi.mock('./ValueWithLabel', () => ({
    ValueWithLabel: ({ children, label, interpret }: any) => {
        const interpretedLabel = interpret ? interpret(label) : label;

        return (
            <div data-testid="value-with-label">
                {interpretedLabel && <div data-testid="label">{interpretedLabel}</div>}
                {children}
            </div>
        );
    },
}));

vi.mock('./LunaticComponent', () => ({
    LunaticComponent: ({ component }: any) => (
        <div data-testid="lunatic-component">{component.componentType}</div>
    ),
}));

vi.mock('../utils/markdownParser', () => ({
    renderContent: vi.fn((interpret, label, style) => {
        const interpretedLabel = interpret(label);
        return <span data-testid="table-content">{interpretedLabel}</span>;
    })
}));


const mockInterpret = vi.fn((expr: string | VTLExpression | undefined): ReactNode => {
    if (typeof expr === 'string') {
        return '12345';
    }
    if (expr && typeof expr === 'object' && 'value' in expr) {
        return expr.value;
    }
    return '';
});

describe('Suggester Component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockInterpret.mockClear();
    });

    const mockProps = {
        interpret: mockInterpret,
        id: 'suggester-1',
        label: { value: 'Select your place', type: 'VTL|MD' } as VTLExpression,
        response: { name: 'TEST_PLACE' },
        storeName: 'L_PLACES',
        componentType: 'Suggester' as const,
    }

    it('renders collected value and nomenclature label when available', async () => {
        const mockGetLabel = vi.mocked(nomenclatureCache.getLabelFromCache);
        mockGetLabel.mockReturnValue('Monoco\'s Station');

        render(<Suggester  {...mockProps} />);

        expect(mockInterpret).toHaveBeenCalledWith('TEST_PLACE');
        expect(mockGetLabel).toHaveBeenCalledWith('L_PLACES', '12345');

        expect(screen.getByTestId('value-with-label')).toBeInTheDocument();
        expect(screen.getByTestId('label')).toHaveTextContent('Select your place');
        expect(screen.getByTestId('pdf-text')).toHaveTextContent("Monoco's Station");

    });

    it('should display __ when response is missing', () => {

        const emptyInterpret = vi.fn(() => undefined) as unknown as Interpreter;

        const mockGetLabel = vi.mocked(nomenclatureCache.getLabelFromCache);
        mockGetLabel.mockReturnValue(undefined);

        const mockProps = {
            interpret: emptyInterpret,
            id: 'suggester-1',
            label: { value: 'Select your place', type: 'VTL|MD' } as VTLExpression,
            response: { name: '' },
            storeName: 'L_PLACES',
            componentType: 'Suggester' as const,
        }
        render(<Suggester  {...mockProps} />);

        expect(mockGetLabel).not.toHaveBeenCalled();

        expect(screen.getByTestId('value-with-label')).toBeInTheDocument();
        expect(screen.getByTestId('pdf-text')).toHaveTextContent('__');
    });

    it('renders collected value when nomenclature is not found', () => {
        const mockGetLabel = vi.mocked(nomenclatureCache.getLabelFromCache);
        mockGetLabel.mockReturnValue(undefined);

        const mockPropsNoStore = {
            interpret: mockInterpret,
            id: 'suggester-1',
            label: { value: 'Select your place', type: 'VTL|MD' } as VTLExpression,
            response: { name: 'TEST_PLACE' },
            storeName: 'UNKNOWN_STORE',
            componentType: 'Suggester' as const,
        }
        render(<Suggester  {...mockPropsNoStore} />);
        expect(mockInterpret).toHaveBeenCalledWith('TEST_PLACE');

        expect(screen.getByTestId('value-with-label')).toBeInTheDocument();
        expect(screen.getByTestId('label')).toHaveTextContent('Select your place');
        expect(screen.getByTestId('pdf-text')).toHaveTextContent('12345');
    });

});
