import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CriteresRecherche = () => {
  return (
    <MainCard title="Affecter les catégories">
      <span>Critéres de recherche:</span>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Date" variant="outlined" />
        <TextField id="outlined-basic" label="Libellé" variant="outlined" />
        <TextField id="outlined-basic" label="Débit (MAD)" variant="outlined" />
        <Button variant="contained" size="large">
          RECHERCHER
        </Button>
      </Box>
    </MainCard>
  );
};

export default CriteresRecherche;
