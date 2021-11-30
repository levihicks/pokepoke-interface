import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants/web3';
import { abi } from '../constants/abis/PokePoke.json';

interface PokeTransaction {
  state: 'pending' | 'error' | 'success';
  message?: string;
  transactionHash?: string;
}

const usePoke = () => {
  const [currentPokeTransaction, setCurrentPokeTransaction] =
    useState<PokeTransaction | null>(null);

  const poke = (addr: string) => {
    if (!ethers.utils.isAddress(addr)) {
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

    const pokePokeContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      provider
    );

    const pokePokeContractWithSigner = pokePokeContract.connect(signer);

    pokePokeContractWithSigner
      .poke(addr)
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
              message: `Successfully poked ${addr}!`,
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

  return { currentPokeTransaction, poke };
};

export default usePoke;
