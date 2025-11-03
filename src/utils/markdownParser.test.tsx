import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { MarkdownPDF, renderContent } from './markdownParser';
import { VTLExpression } from '../types';

vi.mock('../../components/styles', () => ({
    styles: {
        h1: { fontSize: 24, fontWeight: 'bold' },
        h2: { fontSize: 20, fontWeight: 'bold' },
        h3: { fontSize: 18, fontWeight: 'bold' },
        paragraph: { fontSize: 14, lineHeight: 1.5 },
        strong: { fontWeight: 'bold' },
        emphasis: { fontStyle: 'italic' },
        list: { marginLeft: 20 }
    }
}));

describe('MarkdownPDF', () => {
    it('renders markdown headings correctly', () => {
        const markdown = '# Heading 1\n## Heading 2\n### Heading 3';
        render(<MarkdownPDF markdown={markdown} />);
        expect(screen.getByText('Heading 1')).toBeInTheDocument();
        expect(screen.getByText('Heading 2')).toBeInTheDocument();
        expect(screen.getByText('Heading 3')).toBeInTheDocument();

        expect(screen.queryAllByText).not.toContain('#');

    });

    it('renders paragraphs, bold, and italic text correctly', () => {
        const markdown = 'This is a **bold** text and this is an *italic* text.';
        render(<MarkdownPDF markdown={markdown} />);
        expect(screen.getByText('bold')).toBeInTheDocument();
        expect(screen.getByText('italic')).toBeInTheDocument();

        const container = document.body;

        expect(container.textContent).not.toContain('**bold**');
        expect(container.textContent).not.toContain('*italic*');
        expect(container.innerHTML).not.toContain('**');
        expect(container.innerHTML).not.toContain('*italic*');

        const boldElement = screen.getByText('bold');
        expect(boldElement).toBeInTheDocument();
        expect(boldElement).toHaveStyle('font-weight: bold');

        const italicElement = screen.getByText('italic');
        expect(italicElement).toBeInTheDocument();
        expect(italicElement).toHaveStyle('font-style: italic');

    });

    it('processes line breaks and converts HTML entities', () => {
        const markdown = 'First line&#xd;Second line&#13;Third line';
        render(<MarkdownPDF markdown={markdown} />);

        const container = document.body;

        expect(container.textContent).toContain('First line');
        expect(container.textContent).toContain('Second line');
        expect(container.textContent).toContain('Third line');

        expect(container.textContent).not.toContain('&#xd;');
        expect(container.textContent).not.toContain('&#13;');
        expect(container.innerHTML).not.toContain('&#xd;');
        expect(container.innerHTML).not.toContain('&#13;');
    });


    it('shows tooltip as regular text', () => {
        const markdown = 'This is a [tooltip](This is a tooltip text).';
        render(<MarkdownPDF markdown={markdown} />);

        const container = document.body;

        expect(container.textContent).toContain('This is a tooltip text');
        expect(container.innerHTML).not.toContain('<a');
    });

    it('handles empty markdown without errors', () => {
        render(<MarkdownPDF markdown="" />);

        expect(screen.queryAllByText).toHaveLength(0);
    });

    it('render Markdwown only if the label has type VTL|MD', () => {
        const interpret = vi.fn((expr: string | VTLExpression | undefined): React.ReactNode => {
            if (typeof expr === 'string') {
                return expr;
            }
            if (expr && typeof expr === 'object' && 'value' in expr) {
                return expr.value;
            }
            return '';
        });
        const label: VTLExpression = { value: '# Markdown Title', type: 'VTL|MD' };

        const renderedContent = renderContent(interpret, label);

        render(<>{renderedContent}</>);

        expect(screen.getByText('Markdown Title')).toBeInTheDocument();

    })

    it('render plain text if the label is not of type VTL|MD', () => {
        const interpret = vi.fn((expr: string | VTLExpression | undefined): React.ReactNode => {
            if (typeof expr === 'string') {
                return expr;
            }
            if (expr && typeof expr === 'object' && 'value' in expr) {
                return expr.value;
            }
            return '';
        });
        const label: VTLExpression = { value: '# Not Markdown Title', type: 'TXT' };

        const renderedContent = renderContent(interpret, label);
        render(<>{renderedContent}</>);

        expect(screen.getByText('# Not Markdown Title')).toBeInTheDocument();
    })
});