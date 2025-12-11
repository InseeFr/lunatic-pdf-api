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
		paddingVertical: rem(1),
		paddingHorizontal: rem(1),
		// fontFamily: 'Geist',
	},
	h1: {
		color: colors.foreground,
		fontWeight: 'semibold',
		fontSize: rem(1.1),
		lineHeight: 1.3,
		marginTop: rem(0.8),
		marginBottom: rem(0.5),
	},
	h2: {
		color: colors.foreground,
		fontWeight: 'semibold',
		fontSize: rem(0.7),
		marginBottom: rem(0.5),
	},
	h3: {
		color: colors.foreground,
		fontWeight: 'semibold',
		fontSize: rem(0.9),
		marginTop: rem(1),
		marginBottom: rem(0.5),
	},
	question: {
		marginBottom: rem(0.5),
	},
	sequence: {
		paddingLeft: rem(1),
		borderLeftWidth: 1,
		borderLeftStyle: 'solid',
		borderLeftColor: colors.border,
		marginBottom: rem(0.5),
	},
	paragraph: {
		marginBottom: 10,
		lineHeight: 1.5,
		fontSize: rem(0.5),
	},
	answer: {
		color: colors.muted,
		fontSize: rem(0.7),
		lineHeight: 1.25,
	},
	strong: {
		fontSize: rem(0.7),
		lineHeight: 1.2,
		fontWeight: 'bold',
	},
	emphasis: {
		fontSize: rem(0.7),
		fontStyle: 'italic',
	},
	label: {
		color: colors.foreground,
		fontWeight: 'semibold',
		fontSize: rem(0.7),
		lineHeight: 1.2,
		marginBottom: rem(0.25),
	},
	error: {
		color: 'red',
	},
	td: {
		padding: rem(0.25),
	},
	th: {
		backgroundColor: '#f0f0f0',
		padding: 8,
		borderBottom: '2pt solid #333',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

	},
	headerText: {
		fontWeight: 'bold',
		fontSize: rem(0.6),
		color: '#333',
		marginBottom: 0,
	},
	table: {
		marginBottom: rem(1),
		marginTop: rem(0.5),
	},
	list: {
		marginBottom: rem(1),
		marginLeft: rem(2),
	},
	link: {
		//color: colors.link,
		lineHeight: 1.5,
		textDecoration: 'none'
	},

} as Record<string, Style>;
