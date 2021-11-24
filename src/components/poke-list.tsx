import React, { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/system';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import defaultTheme from '../theme';
import { makeStyles } from '@mui/styles';
import PokeBackButton from './poke-back-button';

const StyledPokeList = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  margin: '2rem 0 ',
}));

const rows = [
  {
    id: 1,
    col1: '0x0667f7Bd15b401f84bB35f11FA0b4Fa4735E9d6A',
    col2: '2021-11-04 11:21:54',
    col3: 'https://etherscan.io/tx/0xcae08830ff01955556df9523a3c826c618ae78f92046bee771c9d09b3a62f1a8',
    col4: 'Poke Back',
  },
  {
    id: 2,
    col1: '0x0667f7Bd15b401f84bB35f11FA0b4Fa4735E9d6A',
    col2: '2021-11-04 11:21:54',
    col3: 'https://etherscan.io/tx/0xcae08830ff01955556df9523a3c826c618ae78f92046bee771c9d09b3a62f1a8',
    col4: 'Poke Back',
  },
  {
    id: 3,
    col1: '0x0667f7Bd15b401f84bB35f11FA0b4Fa4735E9d6A',
    col2: '2021-11-04 11:21:54',
    col3: 'https://etherscan.io/tx/0xcae08830ff01955556df9523a3c826c618ae78f92046bee771c9d09b3a62f1a8',
    col4: 'Poke Back',
  },
];

const columns: GridColumns = [
  {
    field: 'col1',
    headerClassName: 'poke-dapp-theme--header',
    headerName: 'From',
    width: 300,
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
    renderCell: (params: any) => {
      return (
        <div style={{ margin: 'auto' }}>
          <a href={params.formattedValue}>View</a>
        </div>
      );
    },
    headerAlign: 'center',
  },
  {
    field: 'col4',
    headerClassName: 'poke-dapp-theme--header',
    headerName: '',
    width: 150,
    renderCell: () => {
      return (
        <div style={{ margin: 'auto' }}>
          <PokeBackButton />
        </div>
      );
    },
  },
];

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

const PokeList = () => {
  const [currentTab, setCurrentTab] = useState<'sent' | 'received'>('sent');

  const classes = useStyles();

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
          Sent (22)
        </ToggleButton>
        <ToggleButton
          sx={{ fontSize: '1.15rem', fontWeight: 'bold' }}
          value='received'
        >
          Received (77)
        </ToggleButton>
      </ToggleButtonGroup>
      <div
        style={{
          display: 'flex',
          height: '100%',
          paddingTop: '1rem',
          width: 752,
          margin: 'auto',
        }}
        className={classes.root}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            getRowClassName={() => 'poke-dapp-theme--row'}
            getCellClassName={() => 'poke-dapp-theme--cell'}
          />
        </div>
      </div>
    </StyledPokeList>
  );
};

export default PokeList;
