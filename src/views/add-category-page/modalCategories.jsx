import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';

const ModalCategories = (props) => {
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState('');
  const [selectedCategory2, setSelectedCategory2] = useState('');
  const [selectedCategory3, setSelectedCategory3] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response1 = await axios.get('http://localhost:5000/categories1');
        const response2 = await axios.get('http://localhost:5000/categories2');
        const response3 = await axios.get('http://localhost:5000/categories3');

        if (response1 && response1.data) {
          setCategories1(response1.data.categories1);
        } else {
          console.error('Error fetching categories1: Response data is undefined or null.');
        }
        if (response2 && response2.data) {
          setCategories2(response2.data.categories2);
        } else {
          console.error('Error fetching categories2: Response data is undefined or null.');
        }
        if (response3 && response3.data) {
          setCategories3(response3.data.categories3);
        } else {
          console.error('Error fetching categories3: Response data is undefined or null.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run the effect only once

  const handleCategory1Change = (event) => {
    setSelectedCategory1(event.target.value);
  };

  const handleCategory2Change = (event) => {
    setSelectedCategory2(event.target.value);
  };

  const handleCategory3Change = (event) => {
    setSelectedCategory3(event.target.value);
  };

  const handleSave = async () => {
    try {
      // Make an API request to update the Historique record
      const response = await axios.put('http://localhost:5000/update-historique-categories', {
        historiqueId: props.idHistorique,
        categorie1: selectedCategory1 || null,
        categorie2: selectedCategory2 || null,
        categorie3: selectedCategory3 || null
      });
      // Handle the response as needed
      console.log('Update response:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating historique categories:', error);
    }
  };

  return (
    <div>
      <Box sx={{ minWidth: 400 }}>
        <FormControl sx={{ minWidth: 200, marginLeft: 11 }}>
          <InputLabel id="category1-label">{categories1.find((cat) => cat._id === props.idCat1)?.name || 'Choisir Catégorie 1'}</InputLabel>
          <Select
            labelId="category1-label"
            id="category1-select"
            value={selectedCategory1}
            label="Catégorie 1"
            onChange={handleCategory1Change}
          >
            {categories1.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl sx={{ minWidth: 200, marginLeft: 11 }}>
          <InputLabel id="category2-label">{categories2.find((cat) => cat._id === props.idCat2)?.name || 'Choisir Catégorie 2'}</InputLabel>
          <Select
            labelId="category2-label"
            id="category2-select"
            value={selectedCategory2}
            label="Catégorie 2"
            onChange={handleCategory2Change}
          >
            {categories2.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl sx={{ minWidth: 200, marginLeft: 11 }}>
          <InputLabel id="category3-label">{categories3.find((cat) => cat._id === props.idCat3)?.name || 'Choisir Catégorie 3'}</InputLabel>
          <Select
            labelId="category3-label"
            id="category3-select"
            value={selectedCategory3}
            label="Catégorie 3"
            onChange={handleCategory3Change}
          >
            {categories3.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Button sx={{ minWidth: 200, marginLeft: 11 }} variant="contained" onClick={handleSave}>
          Enregistrer
        </Button>
        <br />
        <br />
      </Box>
    </div>
  );
};

export default ModalCategories;
