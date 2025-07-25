import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom Material UI theme for the app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#212121' }, // Almost black
    secondary: { main: '#616161' }, // Medium grey
    background: {
      default: '#181818', // Deep black
      paper: '#232323', // Slightly lighter black
    },
    text: {
      primary: '#fff',
      secondary: '#bdbdbd',
    },
    accent: { main: '#424242' },
    info: { main: '#757575' },
    success: { main: '#9e9e9e' },
    warning: { main: '#bdbdbd' },
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    fontWeightBold: 700,
    h1: { fontWeight: 800, fontSize: '3rem', letterSpacing: '-1px', color: '#fff' },
    h2: { fontWeight: 700, fontSize: '2.25rem', color: '#fff' },
    h3: { fontWeight: 700, fontSize: '1.75rem', color: '#fff' },
    h4: { fontWeight: 600, fontSize: '1.5rem', color: '#fff' },
    h5: { fontWeight: 600, fontSize: '1.25rem', color: '#fff' },
    h6: { fontWeight: 600, fontSize: '1rem', color: '#fff' },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Get the root DOM element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Root />
  </ThemeProvider>
);

// Optional: Measure app performance (for analytics or debugging)
// To log results, pass a function (e.g., reportWebVitals(console.log))
reportWebVitals();
