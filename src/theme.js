const baseTheme = {
    typography: {
        h1: {
            fontSize: '40px',
        },
        h2: {
            fontSize: '25px',
        },
        subtitle1: {
            fontWeight: 'bold',
        },
    },
    overrides: {
        MuiFormHelperText: {
            root: { marginBottom: '-20px' },
        },
    },
};

const lightTheme = {
    ...baseTheme,
    palette: {
        type: 'light',
        primary: {
            main: '#374785',
        },
        secondary: {
            main: '#A8D0E6',
        },
        error: {
            main: '#B00020',
        },
        background: {
            default: '#fafafa',
            paper: '#fff',
        },
        text: {
            primary: '#000',
        },
    },
};

const darkTheme = {
    ...baseTheme,
    palette: {
        type: 'dark',
        primary: {
            main: '#374785',
        },
        secondary: {
            main: '#7d64ce',
        },
        error: {
            main: '#B00020',
        },
        background: {
            default: '#424242',
            paper: '#303030',
        },
        text: {
            primary: '#fff',
        },
    },
};
export { lightTheme, darkTheme };
