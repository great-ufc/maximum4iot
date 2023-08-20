import React from 'react';
import useGoogleSheets from 'use-google-sheets';
import { useNavigate } from 'react-router-dom';
import Table from './Table';

function Artifacts(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = React.useMemo(
    () => [
      {
        Artifacts: 'Loading...',
        Description: 'Loading...',
        NFR: 'Loading...', 'Measurement function': 'Loading...',
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
    //console.log('artefetos e vc:', sheetData[1]['data'])
    data = sheetData[1]['data'];
    console.log('Artifacts data:', data)
  }

  if (error) {
    console.log('Error!');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Artifact',
        accessor: 'Artifact', // accessor is the "key" in the data
      },
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

  return (
    <div>
      {console.log('opa',data)}
      <Table
        columns={columns}
        data={data}
        onSelectedRowsClicked={(selectedRow) => setSelectedRows(selectedRow)}
      />
      <div className='d-grid gap-2'>
        <button
          className='btn btn-lg btn-primary'
          type='button'
          onClick={() =>
            navigate('/softwaremetrics', {
              state: { data: selectedRows },
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Artifacts;
