import type { Style } from '@react-pdf/stylesheet';

const rem = (v: number = 1) => Math.round(v * 16);

const colors = {
    foreground: '#0a0a0a',
    muted: '#737373',
    border: '#e5e5e5',
};

export const pdfStyles = {
    page: {
        paddingVertical: rem(),
        paddingHorizontal: rem(2),

        // fontFamily: 'Geist',
    },
    title: {
        color: colors.foreground,
        fontWeight: 'bold', fontSize: rem(3),
        textAlign: 'center'
    },

    h1: {
        color: colors.foreground,
        fontWeight: 'semibold',
        fontSize: rem(1.5),
        lineHeight: 1.3,
        marginTop: rem(2),
        marginBottom: rem(1),
    },
    h2: {
        color: colors.foreground,
        fontWeight: 'semibold',
        fontSize: rem(1.25),
        marginBottom: rem(1),
    },
    h3: {
        color: colors.foreground,
        fontWeight: 'semibold',
        fontSize: rem(1.15),
        marginTop: rem(1.2),
        marginBottom: rem(1),
    },
    question: {
        marginBottom: rem(0.5),
    },
    sequence: {
        paddingLeft: rem(1),
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: colors.border,
        marginBottom: rem(1),
    },
    answer: {
        color: colors.muted,
        fontSize: rem(0.75),
        lineHeight: 1.25,
    },
    label: {
        color: colors.foreground,
        fontWeight: 'semibold',
        fontSize: rem(0.75),
        lineHeight: 1.2,
        marginBottom: rem(0.25),
    },
    error: {
        color: 'red',
    },
    td: {
        padding: rem(0.2),
    },
    table: {
        marginBottom: rem(1),
    },
} as Record<string, Style>;