import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/header';
import Pokebar from './components/pokebar';
import PokeList from './components/poke-list';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  const reloadPage = () => window.location.reload();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    (window as any).ethereum.on('chainChanged', reloadPage);
    (window as any).ethereum
      .request({ method: 'eth_chainId' })
      .then((res: string) => {
        if (['0x3'].indexOf(res) === -1) {
          setDialogOpen(true);
        }
      });
    return () => {
      (window as any).ethereum.removeListener('chainChanged', reloadPage);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ height: '100vh' }}>
          <Header />
          <Pokebar />
          <PokeList />
          <Dialog open={dialogOpen}>
            <DialogTitle>Error: Chain not supported.</DialogTitle>
            <DialogContent>Please switch to a supported chain.</DialogContent>
          </Dialog>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
