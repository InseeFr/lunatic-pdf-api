
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { TitlePage } from './TitlePage';

vi.mock('@react-pdf/renderer', () => ({
    Text: ({ children, style }: any) => <span data-testid="pdf-text">{children}</span>,
    View: ({ children, style }: any) => <div data-testid="pdf-view" >{children}</div>,
    Page: ({ children, style }: any) => <div data-testid="pdf-page" style={style}>{children}</div>,
    Svg: ({ children, style }: any) => <svg data-testid="pdf-svg" style={style}>{children}</svg>,
    Path: ({ children, style }: any) => <path data-testid="pdf-path" style={style}>{children}</path>,
    G: ({ children, style }: any) => <g data-testid="pdf-g" style={style}>{children}</g>,
    Rect: ({ children, style }: any) => <rect data-testid="pdf-rect" style={style}>{children}</rect>,
    Polygon: ({ children, style }: any) => <polygon data-testid="pdf-polygon" style={style}>{children}</polygon>,
    StyleSheet: {
        create: (styles: any) => styles,
    },
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


describe('TitlePage', () => {
    it('renders survey title and validation date', () => {
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

        render(<TitlePage data={mockData} />);
        expect(screen.getByText(/Données saisies pour Test Survey/i)).toBeInTheDocument();
        expect(screen.getByText(/1 janvier 2026/i)).toBeInTheDocument();
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
        render(<TitlePage data={mockData} />);
        expect(screen.getByText(/Données saisies pour N\/A/i)).toBeInTheDocument();
        expect(screen.queryByText(/Unité enquêtée/i)).not.toBeInTheDocument();
    });

});