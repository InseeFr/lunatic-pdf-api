import type { Style } from '@react-pdf/stylesheet';

const colors = {
	foreground: '#0a0a0a',
	muted: '#737373',
	border: '#e5e5e5',
	link: '#291ad3ff',
};

const rem = (v: number = 1) => Math.round(v * 16);

export const depth = { current: 1 as 1 | 2 };

export const styles = {
	page: {
		paddingVertical: rem(),
		paddingHorizontal: rem(2),
		// fontFamily: 'Geist',
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
	paragraph: {
		marginBottom: 10,
		lineHeight: 1.5,
		fontSize: rem(0.75),
	},
	answer: {
		color: colors.muted,
		fontSize: rem(0.75),
		lineHeight: 1.25,
	},
	strong: {
		fontSize: rem(0.75),
		lineHeight: 1.25,
		fontWeight: 'bold',
	},
	emphasis: {
		fontSize: rem(0.75),
		fontStyle: 'italic',
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
	th: {
		backgroundColor: '#f0f0f0',
		padding: 8,
		borderBottom: '2pt solid #333',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 12,
		color: '#333',
	},
	table: {
		marginBottom: rem(1),
	},
	list: {
		marginBottom: 10,
		marginLeft: 20,
	},
	link: {
		color: colors.link,
		textDecoration: 'underline',
		lineHeight: 1.5,
	},

} as Record<string, Style>;
