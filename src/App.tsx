import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import Header from './components/header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ height: '100vh' }}>
        <Header />
      </Container>
    </ThemeProvider>
  );
}

export default App;
