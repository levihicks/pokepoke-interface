import Button from '@mui/material/Button';
import usePoke from '../hooks/usePoke';

interface PokeBackButtonProps {
  address: string;
}

const PokeBackButton = ({ address }: PokeBackButtonProps) => {
  const { poke } = usePoke();

  return (
    <Button
      onClick={() => poke(address)}
      variant='contained'
      color='secondary'
      sx={{ fontWeight: 'bold' }}
    >
      Poke Back
    </Button>
  );
};

export default PokeBackButton;
