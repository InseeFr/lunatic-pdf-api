
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Footer } from './Footer';

vi.mock('@react-pdf/renderer', () => ({
    Text: ({ children, style }: any) => <span data-testid="pdf-text">{children}</span>,
    View: ({ children, style }: any) => <div data-testid="pdf-view" >{children}</div>,
    Font: {
        register: vi.fn(),
    },
}));

vi.mock('./styles', () => ({
    styles: {
        label: {},
    },
    depth: { current: 0 },

}));


describe('Footer', () => {
    it('renders footer correctly', () => {
        const mockData = {
            body: {
                interrogation: {
                    collectionInstrumentId: 'Test Survey',
                    payload: {
                        validationDate: '2026-01-01T00:00:00Z',
                        usualSurveyUnitId: '12345'
                    }
                }
            }
        };

        render(<Footer data={mockData} />);
        expect(screen.getByText(/Test Survey/i)).toBeInTheDocument();
        expect(screen.getByText(/12345/i)).toBeInTheDocument();
    });

    it('renders default title and date when data is missing', () => {
        const mockData = {
            body: {
                interrogation: {
                    payload: {}
                }
            }
        };
        render(<Footer data={mockData} />);
        expect(screen.getByText(/N\/A/i)).toBeInTheDocument();
    });

});