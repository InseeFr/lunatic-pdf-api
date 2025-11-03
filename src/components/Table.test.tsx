import { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Table } from './Table';
import type { VTLExpression } from '../types';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';


vi.mock('@react-pdf/renderer', () => ({
    Text: ({ children, style }: any) => <span data-testid="pdf-text" style={style}>{children}</span>,
    View: ({ children, style }: any) => <div data-testid="pdf-view" style={style}>{children}</div>,
    StyleSheet: {
        create: (styles: any) => styles,
    },
}));

vi.mock('@ag-media/react-pdf-table', () => ({
    Table: ({ children, style }: any) => <table data-testid="pdf-table" style={style}>{children}</table>,
    TR: ({ children }: any) => <tr data-testid="pdf-tr">{children}</tr>,
    TD: ({ children, style }: any) => <td data-testid="pdf-td" style={style}>{children}</td>,
    TH: ({ children, style }: any) => <th data-testid="pdf-th" style={style}>{children}</th>,
}));

vi.mock('./styles', () => ({
    styles: {
        table: { width: '100%' },
        td: { padding: 5 },
        th: { fontWeight: 'bold' },
        answer: { fontSize: 12 },
        label: { fontSize: 14 },
    },
    depth: { current: 0 },
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
        return expr;
    }
    if (expr && typeof expr === 'object' && 'value' in expr) {
        return expr.value;
    }
    return '';
});

describe('Table Component', () => {

    beforeEach(() => {
        mockInterpret.mockClear();
    });

    it('renders table with header and body', async () => {

        const tableProps = {
            componentType: 'Table' as const,
            interpret: mockInterpret,
            id: 'test-table-id',
            label: { value: 'Test Table', type: 'VTL|MD' } as VTLExpression,
            header: [
                { label: { value: 'Column 1', type: 'VTL|MD' } as VTLExpression },
                { label: { value: 'Column 2', type: 'VTL|MD' } as VTLExpression }
            ],
            body: [
                [
                    { label: { value: 'Row 1 Col 1', type: 'VTL|MD' } as VTLExpression },
                    { label: { value: 'Row 1 Col 2', type: 'VTL|MD' } as VTLExpression }
                ],
                [
                    { label: { value: 'Row 2 Col 1', type: 'VTL|MD' } as VTLExpression },
                    { label: { value: 'Row 2 Col 2', type: 'VTL|MD' } as VTLExpression }
                ]
            ]
        };

        render(<Table {...tableProps} />);

        expect(screen.getByTestId('value-with-label')).toBeInTheDocument();
        expect(screen.getByTestId('pdf-table')).toBeInTheDocument();

        const { renderContent } = vi.mocked(await import('../utils/markdownParser'));
        expect(renderContent).toHaveBeenCalled();

        const contentElements = screen.getAllByTestId('table-content');
        expect(contentElements.length).toBeGreaterThan(0);

        expect(screen.getByText('Test Table')).toBeInTheDocument();

        expect(screen.getByText('Column 1')).toBeInTheDocument();
        expect(screen.getByText('Column 2')).toBeInTheDocument();
        expect(screen.getByText('Row 1 Col 1')).toBeInTheDocument();
        expect(screen.getByText('Row 1 Col 2')).toBeInTheDocument();
        expect(screen.getByText('Row 2 Col 1')).toBeInTheDocument();
        expect(screen.getByText('Row 2 Col 2')).toBeInTheDocument();
    });
});
