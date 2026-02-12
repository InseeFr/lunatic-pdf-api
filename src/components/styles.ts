import type { Style } from '@react-pdf/stylesheet';
import { Font } from '@react-pdf/renderer';
import OpenSansRegular from '../assets/fonts/OpenSans/OpenSans-Regular.ttf';
import OpenSansItalic from '../assets/fonts/OpenSans/OpenSans-Italic.ttf';
import OpenSansSemiBold from '../assets/fonts/OpenSans/OpenSans-SemiBold.ttf';
import OpenSansSemiBoldItalic from '../assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf';
import OpenSansBold from '../assets/fonts/OpenSans/OpenSans-Bold.ttf';
import OpenSansBoldItalic from '../assets/fonts/OpenSans/OpenSans-BoldItalic.ttf';

Font.register({
	family: 'Open Sans',
	fonts: [
		{
			src: OpenSansRegular,
			fontWeight: 'normal',
		},
		{
			src: OpenSansItalic,
			fontWeight: 'normal',
			fontStyle: 'italic',
		},
		{
			src: OpenSansSemiBold,
			fontWeight: 600,
		},
		{
			src: OpenSansSemiBoldItalic,
			fontWeight: 600,
			fontStyle: 'italic',
		},
		{
			src: OpenSansBold,
			fontWeight: 'bold',
		},
		{
			src: OpenSansBoldItalic,
			fontWeight: 'bold',
			fontStyle: 'italic',
		},
	],
});


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
		paddingTop: rem(1),
		paddingBottom: rem(3),
		paddingHorizontal: rem(1),
		fontFamily: 'Open Sans',
	},
	titleHeader: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#0a0a0a',
	},
	titleSubHeader: {
		fontSize: 16,
		fontWeight: 'semibold',
		color: '#0a0a0a',
		marginBottom: 5
	},
	titleLabel: {
		fontSize: 12,
		color: '#737373',
	},
	footerBar: {
		position: 'absolute',
		bottom: 33,
		left: 10,
		right: 10,
		borderTopWidth: 1,
		borderTopColor: '#000000',
	},
	footerContent: {
		position: 'absolute',
		bottom: 8,
		left: 15,
		right: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
