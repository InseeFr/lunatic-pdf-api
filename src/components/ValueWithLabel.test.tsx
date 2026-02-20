import { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ValueWithLabel } from './ValueWithLabel';
import type { VTLExpression } from '../models/types';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';


vi.mock('@react-pdf/renderer', () => ({
    Text: ({ children, style }: any) => <span data-testid="pdf-text">{children}</span>,
    View: ({ children, style }: any) => <div data-testid="pdf-view" >{children}</div>,
    StyleSheet: {
        create: (styles: any) => styles,
    },
}));

vi.mock('./styles', () => ({
    styles: {
        label: {},
    },
    depth: { current: 0 },
}));

vi.mock('../utils/markdownParser', () => ({
    renderContent: vi.fn((interpret, label, style) => {
        const interpretedLabel = interpret(label);
        return <span data-testid="label" >{interpretedLabel}</span>;
    })
}));

const mockInterpret = vi.fn((expr: string | VTLExpression | undefined): ReactNode => {
    if (typeof expr === 'string') {
        return expr;
    }
    if (expr && typeof expr === 'object' && 'value' in expr) {
        return expr.value;
    }
    return '';
});

describe('ValueWithLabel', () => {
    beforeEach(() => {
        mockInterpret.mockClear();
    });

    const valueWithLabelProps = {
        interpret: mockInterpret,
        label: { value: 'Test Value with Label', type: 'VTL|MD' } as VTLExpression
    }

    it('renders label and value', async () => {
        render(
            <ValueWithLabel {...valueWithLabelProps}>
                <span data-testid="value-with-label">Test Value</span>
            </ValueWithLabel>
        );
        const { renderContent } = vi.mocked(await import('../utils/markdownParser'));
        expect(renderContent).toHaveBeenCalled();

        expect(screen.getByTestId('label')).toHaveTextContent('Test Value with Label');
        expect(screen.getByTestId('value-with-label')).toBeInTheDocument();
    });

    it('renders without label when label is not provided', () => {
        render(
            <ValueWithLabel interpret={mockInterpret} label={undefined}>
                <span data-testid="child-content">No Label</span>
            </ValueWithLabel>
        );

        expect(screen.queryByTestId('label')).not.toBeInTheDocument();
        expect(screen.getByTestId('child-content')).toHaveTextContent('No Label');
    });
});