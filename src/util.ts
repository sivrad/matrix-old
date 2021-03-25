export const capitalize = (text: string): string =>
    text[0].toUpperCase() + text.substr(1, text.length);

export const formatAsLabel = (text: string): string =>
    text.split('_').map(capitalize).join(' ');
