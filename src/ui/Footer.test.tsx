
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
        const mockSurveyTitle = "Test Survey";
        const mockUsualSurveyUnitId = "12345";

        render(<Footer surveyTitle={mockSurveyTitle} usualSurveyUnitId={mockUsualSurveyUnitId} />);
        expect(screen.getByText(/Test Survey/i)).toBeInTheDocument();
        expect(screen.getByText(/12345/i)).toBeInTheDocument();
    });



});