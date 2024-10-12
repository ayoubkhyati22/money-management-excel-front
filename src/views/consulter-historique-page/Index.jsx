import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const ConsulterHistoriques = () => {
  const [historiques, setHistoriques] = useState([]);
  const [categoryNames, setCategoryNames] = useState({});


  useEffect(() => {
    console.log('base url: '+ process.env.BASE_URL);
    axios
      .get('http://localhost:5000/all-historique')
      .then((resp) => {
        setHistoriques(resp.data.historiques);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des historiques:', error);
      });
  }, []);

  useEffect(() => {
        // Fetch category names for each historique
        const fetchCategoryNames = async () => {
          try {
            const promises = historiques.map(async (historique) => {
              //console.log(historique._id);
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
    console.log('Historiques: ', historiques);
  }, [historiques]);

  return (
    <MainCard title="Historiques">
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
                </tr>
              </thead>

              <tbody>
                {historiques.map((historique, index) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </MainCard>
  );
};

export default ConsulterHistoriques;
