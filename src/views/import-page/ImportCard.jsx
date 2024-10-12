import React, { useState } from 'react';
import '../../assets/css/style.css';
import Button from '@mui/material/Button';
import Result from './Result';
import * as XLSX from 'xlsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const ImportCard = () => {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);
  const [fileSubmitted, setFileSubmitted] = useState(false);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
        // Reset the fileSubmitted flag when a new file is selected
        setFileSubmitted(false);
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null && !fileSubmitted) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      // Set the fileSubmitted flag to true after processing the file
      setFileSubmitted(true);
    }
  };

  return (
    <>
      <MainCard title="Importer votre fichier Excel">
        <div>
          {/* form */}
          <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleFileSubmit}>
              <Button component="label" variant="outlined" required onChange={handleFile} startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <br />
              <br />
              <Button type="submit" variant="contained" color="secondary" disabled={excelFile === null || fileSubmitted}>
                Visualiser le fichier
              </Button>
              {typeError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {typeError}
                </div>
              )}
            </form>
          </div>
        </div>
      </MainCard>
      <br />
      <Result data={excelData} />
    </>
  );
};

export default ImportCard;
