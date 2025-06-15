declare namespace JSX {
    interface IntrinsicElements {
            'browserux-theme-switcher': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            lang?: string;
            target?: string;
            'data-label-light'?: string;
            'data-label-dark'?: string;
            'no-shadow'?: boolean;
            style?: React.CSSProperties;
        };
    }
}