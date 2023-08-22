import React, { useEffect } from 'react';
import useGoogleSheets from 'use-google-sheets';
import { useNavigate } from 'react-router-dom';
import Table from './Table';

function NonFunctionalRequirements(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = React.useMemo(
    () => [
      {
        Measure: 'Loading...',
        Description: 'Loading...',
        NFR: 'Loading...',
        'Measurement function': 'Loading...',
        Interpretation: 'Loading...',
        'Collect method': 'Loading...',
        Reference: 'Loading...',
      },
    ],
    []
  );

  const {
    data: sheetData,
    loading,
    error,
  } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
  });

  if (loading) {
    console.log('Loading...');
  } else {
    data = sheetData[0]['data'];
    //console.log('my data:', data)
  }

  if (error) {
    console.log('Error!');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'Description',
      },
      {
        Header: 'NFR',
        accessor: 'NFR',
      },
      {
        Header: 'Reference',
        accessor: 'Reference',
      },
    ],
    []
  );

  useEffect(()=>{
    localStorage.setItem('step1', JSON.stringify(selectedRows));
    //const valor = localStorage.getItem('chave');
    //console.log(valor);
  }, [selectedRows])

  
  //const handleNext = () => {
  //}

  return (
    <div>
      <div className='container fluid'>
      <h4 style={{ color: '#186aa4' }}>CHOOSE THE NFRS</h4>
      <h5 > At the first stage of the process, the non-functional requirements to be assessed are selected. Engaging stakeholders is essential for the this fase to ensure that the evaluation is carried out efficiently and covers all critical aspects of the sustem to be assessed. </h5>
      </div>
      
      <Table
        columns={columns}
        data={data}
        onSelectedRowsClicked={(selectedRow) => setSelectedRows(selectedRow)}
      />
      <center> <div className="container fluid">
      <button className="btn btn-primary btn-lg active mb-5" size="lg" style={{ backgroundColor: '#186aa4',width: '192px' }} 
      onClick={() =>
        navigate('/artifacts', {
          state: { data: selectedRows },
        })
      }
      >
        NEXT STEP
      </button>
   
      </div> </center>
      

    </div>
  );
}

export default NonFunctionalRequirements;
