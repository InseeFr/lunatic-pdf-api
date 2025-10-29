import React from "react";
import { Text, View } from "@react-pdf/renderer";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import { styles } from "../components/styles";
import { Style } from "@react-pdf/stylesheet";

const createPdfComponents = (customStyle?: Style): Components => ({
    h1: ({ children }) => React.createElement(Text, {
        style: customStyle ? [styles.h1, customStyle] : styles.h1
    }, children),

    h2: ({ children }) => React.createElement(Text, {
        style: customStyle ? [styles.h2, customStyle] : styles.h2
    }, children),

    h3: ({ children }) => React.createElement(Text, {
        style: customStyle ? [styles.h3, customStyle] : styles.h3
    }, children),

    p: ({ children }) => React.createElement(Text, {
        style: customStyle ? [styles.paragraph, customStyle] : styles.paragraph
    }, children),

    strong: ({ children }) => React.createElement(Text, {
        style: customStyle ? [styles.strong, customStyle] : styles.strong
    }, children),

    em: ({ children }) => React.createElement(Text, {
        style: customStyle ? [styles.emphasis, customStyle] : styles.emphasis
    }, children),

    ul: ({ children }) => React.createElement(View, {
        style: styles.list
    }, children),

    ol: ({ children }) => React.createElement(View, {
        style: styles.list
    }, children),

    // Unused for now, may be interesting to handle internal links & tooltip 

    // a: ({ children, href }) => React.createElement(Link, {
    //     src: href || '',
    //     style: customStyle ?
    //         { ...styles.link } :
    //         styles.link
    // }, children),

});

const pdfComponents: Components = createPdfComponents();

/**
 * Handle line breaks
 */
const processLineBreaks = (markdown: string): string => {
    return markdown
        .replace(/&#xd;|&#13;/g, '\n')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/(?<!\n)\n(?!\n)/g, '  \n');
};

interface MarkdownInterpreterProps {
    markdown: string;
    style?: Style;
}

export const MarkdownPDF: React.FC<MarkdownInterpreterProps> = ({ markdown, style }) => {
    const processedMarkdown = processLineBreaks(markdown);

    return React.createElement(View, null,
        React.createElement(ReactMarkdown, {
            components: style ? createPdfComponents(style) : pdfComponents
        }, processedMarkdown)
    );
};
