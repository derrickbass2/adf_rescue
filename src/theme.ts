import { createTheme } from '@mui/material/styles';

const theme = createTheme({
palette: {
primary: {
main: '#001F54', // matches --primary-color
dark: '#007BFF', // matches --primary-color-dark
},
secondary: {
main: '#39FF14', // matches --accent-color
},
background: {
default: '#f4f6f8', // matches --background-default
paper: '#ffffff', // matches --card-background
},
text: {
primary: '#212121', // matches --text-primary
secondary: '#757575', // matches --text-secondary
},
error: {
main: '#f44336',
},
warning: {
main: '#8a6d3b',
},
info: {
main: '#31708f',
},
success: {
main: '#3c763d',
},
},
typography: {
fontFamily: ['Roboto', 'sans-serif'].join(','),
},
spacing: 8,
});

export default theme;