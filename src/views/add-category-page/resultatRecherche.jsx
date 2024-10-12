import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ModalCategories from './modalCategories';
import axios from 'axios';


const ResultatRecherche = (props) => {
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [idCat1, setIdCat1] = useState(null);
  const [idCat2, setIdCat2] = useState(null);
  const [idCat3, setIdCat3] = useState(null);
  const [libelle, setLibelle] = useState(null);
  const [categoryNames, setCategoryNames] = useState({});

  const handleEditClick = (id,idCat1,idCat2,idCat3,libelle) => {
    setSelectedId(id);
    setIdCat1(idCat1);
    setIdCat2(idCat2);
    setIdCat3(idCat3);
    setLibelle(libelle);
    setVisible(true);
  };

  const handleClose = () => {
    setSelectedId(null);
    setVisible(false);
  };

  useEffect(() => {

    // Fetch category names for each historique
    const fetchCategoryNames = async () => {
      try {
        const promises = props.data.map(async (historique) => {
          console.log(historique._id);
          if (historique.categorie1) {
            const response = await axios.get(`http://localhost:5000/get-category1-name/${historique.categorie1}`);
            setCategoryNames((prevNames) => ({ ...prevNames, [historique.categorie1]: response.data.categoryName }));
          }
          if (historique.categorie2) {
            const response = await axios.get(`http://localhost:5000/get-category2-name/${historique.categorie2}`);
            setCategoryNames((prevNames) => ({ ...prevNames, [historique.categorie2]: response.data.categoryName }));
          }
          if (historique.categorie3) {
            const response = await axios.get(`http://localhost:5000/get-category3-name/${historique.categorie3}`);
            setCategoryNames((prevNames) => ({ ...prevNames, [historique.categorie3]: response.data.categoryName }));
          }
        });

        await Promise.all(promises);
      } catch (error) {
        console.error('Error fetching category names:', error);
      }
    };

    fetchCategoryNames();
  }, [props.data]);
  return (
    <>
      <Dialog onClose={handleClose} open={visible}>
        <DialogTitle style={{maxWidth:'400px'}}>
        <span style={{ color: 'green' }}>{libelle}</span><br />
          Catégories:
        </DialogTitle>
        <ModalCategories idHistorique={selectedId} idCat1={idCat1} idCat2={idCat2} idCat3={idCat3} />
      </Dialog>
      <MainCard title="Résultat de la recherche">
        <div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Banque</th>
                  <th>Date opération</th>
                  <th>Date valeur</th>
                  <th>Libellé</th>
                  <th>Ref</th>
                  <th>Débit</th>
                  <th>Crédit</th>
                  <th>Catégorie 1</th>
                  <th>Catégorie 2</th>
                  <th>Catégorie 3</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {props.data.map((historique, index) => (
                  <tr key={index}>
                    <td>{historique.banque}</td>
                    <td>{historique.dateOperation}</td>
                    <td>{historique.dateValeur}</td>
                    <td>{historique.libelle}</td>
                    <td>{historique.ref}</td>
                    <td>{historique.debit}</td>
                    <td>{historique.credit}</td>
                    <td style={{ color: historique.categorie1 ? 'green' : 'red' }}>
                      {categoryNames[historique.categorie1] || 'Aucune'}
                    </td>{' '}
                    <td style={{ color: historique.categorie2 ? 'green' : 'red' }}>
                      {categoryNames[historique.categorie2] || 'Aucune'}
                    </td>{' '}
                    <td style={{ color: historique.categorie3 ? 'green' : 'red' }}>
                      {categoryNames[historique.categorie3] || 'Aucune'}
                    </td>{' '}
                    <td style={{ color: 'green' }}>
                      <IconButton aria-label="edit" size="large" onClick={() => handleEditClick(historique._id,historique.categorie1,historique.categorie2,historique.categorie3,historique.libelle)}>
                        <ModeEditIcon color="primary" fontSize="inherit" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainCard>
    </>
  );
};

export default ResultatRecherche;
