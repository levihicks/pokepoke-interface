import { styled } from '@mui/system';
import { colors } from '../theme';
import InputBase from '@mui/material/InputBase';
import Alert from '@mui/material/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ethers } from 'ethers';
import { abi } from '../constants/abis/PokePoke.json';

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

interface PokeTransaction {
  state: 'pending' | 'error' | 'success';
  message?: string;
  transactionHash?: string;
}

const Pokebar = () => {
  const [pokebarInput, setPokebarInput] = useState('');
  const [currentPokeTransaction, setCurrentPokeTransaction] =
    useState<PokeTransaction | null>(null);

  const pokeHandler = async () => {
    const pokebarInputString = pokebarInput;
    if (!ethers.utils.isAddress(pokebarInputString)) {
      setCurrentPokeTransaction({
        state: 'error',
        message: 'Error: invalid address. Please try again.',
      });
      return;
    } else if (currentPokeTransaction?.state === 'error')
      setCurrentPokeTransaction(null);

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    const pokePokeAddress = '0xcf910Bd1bafcf16929b079796d0d60c5797A074D';

    const pokePokeContract = new ethers.Contract(
      pokePokeAddress,
      abi,
      provider
    );

    const pokePokeContractWithSigner = pokePokeContract.connect(signer);

    pokePokeContractWithSigner
      .poke(pokebarInputString)
      .then((res: any) => {
        setCurrentPokeTransaction({
          state: 'pending',
          message: 'Waiting for transaction to be confirmed...',
          transactionHash: res.hash,
        });
        res
          .wait()
          .then((receipt: any) => {
            setCurrentPokeTransaction({
              state: 'success',
              message: `Successfully poked ${pokebarInputString}!`,
              transactionHash: receipt.transactionHash,
            });
          })
          .catch((err: any) =>
            setCurrentPokeTransaction({
              state: 'error',
              message: 'Error: ' + err.message,
            })
          );
      })
      .catch((err: any) =>
        setCurrentPokeTransaction({
          state: 'error',
          message: 'Error: ' + err.message,
        })
      );
  };

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
        <PokeButton onClick={pokeHandler}>
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
