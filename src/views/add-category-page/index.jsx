import React, { useState } from 'react';
import ResultatRecherche from './resultatRecherche';
import MainCard from 'ui-component/cards/MainCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; // Assurez-vous d'importer Axios

const AddCategoriePage = () => {
  const [searchParams, setSearchParams] = useState({
    date: '',
    libelle: '',
    debit: '',
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://money-management-excel-back.vercel.app/search-historiques/search', {
        params: searchParams,
      });
      setSearchResults(response.data.historiques);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  return (
    <>
      <MainCard title="Affecter les catégories">
        <span>Critères de recherche:</span>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Date"
            variant="outlined"
            name="date"
            value={searchParams.date}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            label="Libellé"
            variant="outlined"
            name="libelle"
            value={searchParams.libelle}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            label="Débit (MAD)"
            variant="outlined"
            name="debit"
            value={searchParams.debit}
            onChange={handleInputChange}
          />
          <Button variant="contained" size="large" onClick={handleSearch}>
            RECHERCHER
          </Button>
        </Box>
      </MainCard>
      <br />
      <ResultatRecherche data={searchResults} />
    </>
  );
};

export default AddCategoriePage;
