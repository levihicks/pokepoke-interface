import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/system';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import defaultTheme from '../theme';
import { makeStyles } from '@mui/styles';
import { ethers } from 'ethers';
import PokeBackButton from './poke-back-button';
import { CONTRACT_ADDRESS } from '../constants/web3';
import { abi } from '../constants/abis/PokePoke.json';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectWalletAddress } from '../store/walletStore';

const StyledPokeList = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  margin: '2rem 0',
}));

const useStyles = makeStyles(
  (theme) => {
    return {
      root: {
        '& .poke-dapp-theme--header': {
          color: theme.palette.common.black,
        },
        '& .poke-dapp-theme--header:focus': {
          outline: 'none',
        },
        '& .poke-dapp-theme--header:focus-within': {
          outline: 'none',
        },
        '& .poke-dapp-theme--row': {
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        '& .poke-dapp-theme--cell:focus': {
          outline: 'none',
        },
      },
    };
  },
  { defaultTheme }
);

const provider = new ethers.providers.Web3Provider((window as any).ethereum);

const pokePokeContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

const PokeList = () => {
  const [currentTab, setCurrentTab] = useState<'sent' | 'received'>('sent');
  const [pokesSent, setPokesSent] = useState<any[]>([]);
  const [pokesReceived, setPokesReceived] = useState<any[]>([]);

  const columns: GridColumns = [
    {
      field: 'col1',
      headerClassName: 'poke-dapp-theme--header',
      headerName: currentTab === 'sent' ? 'To' : 'From',
      width: 320,
    },
    {
      field: 'col2',
      headerClassName: 'poke-dapp-theme--header',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'col3',
      headerClassName: 'poke-dapp-theme--header',
      headerName: 'Txn',
      width: 150,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <div style={{ margin: 'auto' }}>
            <a href={`https://etherscan.io/tx/${params.formattedValue}`}>
              View
            </a>
          </div>
        );
      },
    },
    {
      field: 'col4',
      headerClassName: 'poke-dapp-theme--header',
      headerName: '',
      width: 150,
      renderCell: (params: any) => {
        if (params.formattedValue)
          return (
            <div style={{ margin: 'auto' }}>
              <PokeBackButton address={params.formattedValue} />
            </div>
          );
      },
    },
  ];

  const walletAddress = useAppSelector(selectWalletAddress);

  const classes = useStyles();

  const sentFilter = useMemo(
    () => pokePokeContract.filters.PokeEvent(null, null, walletAddress),
    [walletAddress]
  );

  const receivedFilter = useMemo(
    () => pokePokeContract.filters.PokeEvent(null, walletAddress, null),
    [walletAddress]
  );

  const getPokes = useCallback(async () => {
    if (walletAddress) {
      let sentPokes = await pokePokeContract.queryFilter(sentFilter);
      setPokesSent(
        sentPokes.map((p: any) => {
          return {
            id: p.transactionHash,
            col1: p.args.to,
            col2: new Date(p.args.timestamp * 1000).toDateString(),
            col3: p.transactionHash,
            col4: null,
          };
        })
      );

      let receivedPokes = await pokePokeContract.queryFilter(receivedFilter);
      setPokesReceived(
        receivedPokes.map((p: any) => {
          return {
            id: p.transactionHash,
            col1: p.args.from,
            col2: new Date(p.args.timestamp * 1000).toDateString(),
            col3: p.transactionHash,
            col4: p.args.from,
          };
        })
      );
    }
  }, [walletAddress, receivedFilter, sentFilter]);

  useEffect(() => {
    getPokes();
  }, [getPokes]);

  useEffect(() => {
    if (walletAddress) {
      pokePokeContract.on(sentFilter, getPokes);
      pokePokeContract.on(receivedFilter, getPokes);
    }
    return () => {
      pokePokeContract.removeAllListeners();
    };
  }, [walletAddress, getPokes, receivedFilter, sentFilter]);

  return (
    <StyledPokeList>
      <ToggleButtonGroup
        color='primary'
        value={currentTab}
        exclusive
        onChange={(event: any) => setCurrentTab(event.target.value)}
      >
        <ToggleButton
          sx={{ fontSize: '1.15rem', fontWeight: 'bold' }}
          value='sent'
        >
          Sent ({pokesSent.length})
        </ToggleButton>
        <ToggleButton
          sx={{ fontSize: '1.15rem', fontWeight: 'bold' }}
          value='received'
        >
          Received ({pokesReceived.length})
        </ToggleButton>
      </ToggleButtonGroup>
      <div
        style={{
          display: 'flex',
          height: '100%',
          paddingTop: '1rem',
          width: 772,
          margin: 'auto',
        }}
        className={classes.root}
      >
        <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
          {(currentTab === 'sent' && pokesSent.length === 0) ||
          (currentTab === 'received' && pokesReceived.length === 0) ? (
            <Chip
              variant='outlined'
              color='primary'
              label={`No pokes ${currentTab}.`}
              sx={{ fontWeight: 'bold', marginTop: '1rem' }}
            />
          ) : (
            <DataGrid
              rows={currentTab === 'sent' ? pokesSent : pokesReceived}
              columns={columns}
              hideFooter
              autoHeight
              disableSelectionOnClick
              disableColumnMenu
              getRowClassName={() => 'poke-dapp-theme--row'}
              getCellClassName={() => 'poke-dapp-theme--cell'}
            />
          )}
        </div>
      </div>
    </StyledPokeList>
  );
};

export default PokeList;
