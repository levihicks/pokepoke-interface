import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Typography  from '@mui/material/Typography';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" color="primary">Test</Typography>
    </ThemeProvider>
  );
}

export default App;
