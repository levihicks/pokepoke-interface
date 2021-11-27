import { styled } from '@mui/system';
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

  const clickHandler = async () => {
    const [account] = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    dispatch(setWalletAddress(account));
  };

  return (
    <StyledWalletConnectButton onClick={clickHandler}>
      {walletAddress
        ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(38, 42)
        : 'Connect to wallet'}
    </StyledWalletConnectButton>
  );
};

export default WalletConnectButton;
