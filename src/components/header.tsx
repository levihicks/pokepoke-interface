import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import WalletConnectButton from './wallet-connect-button';

const StyledHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 0',
});

const Header = () => {
  return (
    <StyledHeader>
      <Typography variant='h3' color='primary.main' fontWeight='bold'>
        PokePoke!
      </Typography>
      <WalletConnectButton />
    </StyledHeader>
  );
};

export default Header;
