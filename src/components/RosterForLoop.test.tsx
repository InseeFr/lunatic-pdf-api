import { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RosterForLoop } from './RosterForLoop';
import type { VTLExpression, LunaticComponentProps } from '../models/types';
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
        if (expr === 'roster-table-responder') {
            return [
                'Value 1',
                'Value 2',
                'Value 3',
                'Value 4',
                'Value 5'
            ];
        }
        return expr;
    }
    if (expr && typeof expr === 'object' && 'value' in expr) {
        return expr.value;
    }
    return '';
});

const rosterForLoopTestComponent = (overrides?: Partial<LunaticComponentProps<"RosterForLoop">>) => ({
    interpret: mockInterpret,
    label: { value: 'Test Table', type: 'VTL|MD' } as const,
    id: 'roster-for-loop-id',
    componentType: 'RosterForLoop' as const,
    lines: {
        min: { type: 'VTL', value: '0' } as const,
        max: { type: 'VTL', value: '5' } as const
    },
    components: [
        {
            id: "input-number-1",
            max: 100000000,
            min: 0.0,
            unit: { type: "VTL" as const, value: "\"k€\"" },
            decimals: 0,
            response: { name: "roster-table-responder" },
            componentType: "InputNumber" as const,
        },
        {
            label: { type: 'VTL|MD', value: 'Column 2' },
            componentType: 'Text' as const,
        }
    ],
    header: [
        { label: { value: 'Header 1', type: 'VTL|MD' } },
        { label: { value: 'Header 2', type: 'VTL|MD' } }
    ],
    ...overrides
} as LunaticComponentProps<"RosterForLoop">);

describe('RosterForLoop Component', () => {
    beforeEach(() => {
        mockInterpret.mockClear();

    });

    it('renders table with header and body', () => {
        render(<RosterForLoop {...rosterForLoopTestComponent()} />);
        expect(screen.getByTestId('pdf-table')).toBeInTheDocument();
    });

    it('render the correct amount of rows', () => {
        render(<RosterForLoop {...rosterForLoopTestComponent()} />);
        const rows = screen.getAllByTestId('pdf-tr');
        expect(rows.length).toBe(5);
    });

    it('does not render table when there are no components', () => {
        const { container } = render(
            <RosterForLoop {...rosterForLoopTestComponent({ components: [] })} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('render one table when there are 5 or less columns', () => {
        render(<RosterForLoop {...rosterForLoopTestComponent()} />);

        const tables = screen.getAllByTestId('pdf-table');
        expect(tables.length).toBe(1);
    });

    it('split the table when there are more than 5 columns', () => {
        render(
            <RosterForLoop
                {...rosterForLoopTestComponent({
                    components: [
                        {
                            id: "input-number-1",
                            max: 100000000,
                            min: 0.0,
                            unit: { type: "VTL" as const, value: "\"k€\"" },
                            decimals: 0,
                            response: { name: "roster-table-responder" },
                            componentType: "InputNumber" as const,
                        },
                        { label: { type: 'VTL|MD', value: 'Column 2' }, componentType: 'Text' as const },
                        { label: { type: 'VTL|MD', value: 'Column 3' }, componentType: 'Text' as const },
                        { label: { type: 'VTL|MD', value: 'Column 4' }, componentType: 'Text' as const },
                        { label: { type: 'VTL|MD', value: 'Column 5' }, componentType: 'Text' as const },
                        { label: { type: 'VTL|MD', value: 'Column 6' }, componentType: 'Text' as const },
                        { label: { type: 'VTL|MD', value: 'Column 7' }, componentType: 'Text' as const },
                    ],
                    header: [
                        { label: { value: 'H1', type: 'VTL|MD' } },
                        { label: { value: 'H2', type: 'VTL|MD' } },
                        { label: { value: 'H3', type: 'VTL|MD' } },
                        { label: { value: 'H4', type: 'VTL|MD' } },
                        { label: { value: 'H5', type: 'VTL|MD' } },
                        { label: { value: 'H6', type: 'VTL|MD' } },
                        { label: { value: 'H7', type: 'VTL|MD' } },
                    ]
                })}
            />
        );

        const tables = screen.getAllByTestId('pdf-table');
        expect(tables.length).toBe(2);
    });
});