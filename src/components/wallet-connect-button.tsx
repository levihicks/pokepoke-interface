import {styled} from '@mui/system';

const StyledWalletConnectButton = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: '10px 20px',
    borderRadius: '2rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.8,
    }
}));

const WalletConnectButton = () => {
    return (
        <StyledWalletConnectButton>
            Connect to wallet
        </StyledWalletConnectButton>
    );
};

export default WalletConnectButton;