import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import Swal from 'sweetalert2';

const Result = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSaveToDatabase = async () => {
    if (loading) {
      return; // Do nothing if an API request is already in progress
    }

    setLoading(true);

    try {
      // Transformez les noms des champs si nécessaire
      const transformedData = props.data.map((individualExcelData) => ({
        banque: individualExcelData['banque'],
        dateOperation: individualExcelData['Date opération'],
        dateValeur: individualExcelData['Date valeur'],
        libelle: individualExcelData['Libellé'],
        ref: individualExcelData['Réf'],
        debit: individualExcelData['Débit (MAD)'],
        credit: individualExcelData['Crédit (MAD)'],
      }));

      const result = await Swal.fire({
        title: 'Enregistrer ce fichier ?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
      });

      if (result.isConfirmed) {
        // Appel API pour sauvegarder dans la base de données
        await axios.post('http://localhost:5000/add-historiques', transformedData);
        Swal.fire('Saved!', '', 'success').then(()=>{window.location.reload()});

      } else if (result.isDenied) {
        Swal.fire('Annulation de la sauvegarde', '', 'info');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans la base de données:', error);
      Swal.fire('Error', 'An error occurred while saving data.', 'error');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <MainCard title="Contenu de votre fichier Excel">
      <div>
        {/* view data */}
        <div>
          {props.data ? (
            <div>
              <div style={{ textAlign: 'left' }}>
                <Button variant="contained" onClick={handleSaveToDatabase} disabled={loading}>
                  Sauvegarder dans la base de données
                </Button>
                <br />
                <br />
              </div>
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
                  </tr>
                </thead>

                <tbody>
                  {props.data.map((individualExcelData, index) => (
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>Aucun fichier n&apos;est encore téléchargé !</div>
          )}
        </div>
      </div>
    </MainCard>
  );
};

export default Result;
