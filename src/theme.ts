import { createTheme }  from '@mui/material/styles';

const colors = {
    white: '#EEE5E9',
    red: '#D64933',
    black: '#000000',
    gray: '#7C7C7C',
    blue: '#92DCE5'
};

const theme = createTheme({
    typography: {
        fontFamily: [
            'Dosis',
            'sans-serif'
        ].join(','),
    },
    palette: {
        common: {
            black: colors.black,
        },
        primary: {
            main: colors.red,
        },
        secondary: {
            main: colors.blue,
        },
        text: {
            primary: colors.white,
            secondary: colors.gray
        }
    }
});

export default theme;