import { styled } from '@mui/system';
import { colors } from '../theme';
import InputBase from '@mui/material/InputBase';
import Alert from '@mui/material/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import usePoke from '../hooks/usePoke';

const StyledPokebar = styled('div')(({ theme }) => ({
  border: '3px solid ' + theme.palette.primary.main,
  borderRadius: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 0rem 0.5rem 1.5rem',
  margin: '1rem 0',
}));

const PokeButton = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '100%',
  padding: '1.25rem',
  margin: '-1rem -0.1rem',
  borderRadius: '0 2rem 2rem 0',
  cursor: 'pointer',
}));

const Pokebar = () => {
  const [pokebarInput, setPokebarInput] = useState('');

  const { poke, currentPokeTransaction } = usePoke();

  return (
    <>
      <StyledPokebar>
        <InputBase
          placeholder='Wallet address or ENS name'
          sx={{
            color: colors.black,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            flex: 1,
          }}
          value={pokebarInput}
          onChange={(event) => setPokebarInput(event.target.value)}
        />
        <PokeButton onClick={() => poke(pokebarInput)}>
          <FontAwesomeIcon
            size='lg'
            icon={faHandPointRight}
            color={colors.white}
          />
        </PokeButton>
      </StyledPokebar>
      {currentPokeTransaction && (
        <Alert
          severity={
            currentPokeTransaction.state === 'pending'
              ? 'info'
              : currentPokeTransaction.state
          }
          sx={{ fontWeight: 'bold' }}
        >
          {currentPokeTransaction.message}
          {currentPokeTransaction.transactionHash && (
            <a
              href={`https://etherscan.io/tx/${currentPokeTransaction.transactionHash}`}
              style={{ marginLeft: '0.5rem' }}
            >
              View transaction
            </a>
          )}
        </Alert>
      )}
    </>
  );
};

export default Pokebar;
