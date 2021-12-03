import { styled } from '@mui/system';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { selectWalletAddress, setWalletAddress } from '../store/walletStore';

const StyledWalletConnectButton = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '10px 20px',
  borderRadius: '2rem',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}));

const WalletConnectButton = () => {
  const dispatch = useAppDispatch();
  const walletAddress = useAppSelector(selectWalletAddress);

  const getAccount = async () => {
    const [account] = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    dispatch(setWalletAddress(account));
  };

  const walletChangeHandler = (accounts: string[]) => {
    dispatch(setWalletAddress(accounts[0]));
  };

  useEffect(() => {
    (window as any).ethereum.on('accountsChanged', walletChangeHandler);
    return () => {
      (window as any).ethereum.removeListener(
        'accountsChanged',
        walletChangeHandler
      );
    };
  });

  useEffect(() => {
    (window as any).ethereum
      .request({
        method: 'eth_accounts',
      })
      .then((accounts: string[]) => {
        if (accounts[0]) {
          dispatch(setWalletAddress(accounts[0]));
        }
      });
  }, [dispatch]);

  return (
    <StyledWalletConnectButton onClick={getAccount}>
      {walletAddress
        ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(38, 42)
        : 'Connect to wallet'}
    </StyledWalletConnectButton>
  );
};

export default WalletConnectButton;
