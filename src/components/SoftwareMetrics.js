import React from 'react';
import useGoogleSheets from 'use-google-sheets';
import { useNavigate } from 'react-router-dom';
import Table from './Table';

function SoftwareMetrics(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = React.useMemo(
    () => [
      {
        Description: 'Loading...',
        RelatedNFR:'Loading...',
        MeasurementFunction:'Loading...',
        Interpretation:'Loading...',
        CollectMethod:'Loading...',
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
    data = sheetData[2]['data'];
    console.log('SoftwareMetrics data:', data)
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
        Header: 'Related NFR',
        accessor: 'Related NFR',
      },
      {
        Header: 'Measurement function',
        accessor: 'Measurement function',
      },
      {
        Header: 'Interpretation',
        accessor: 'Interpretation',
      },
      {
        Header: 'Collect method',
        accessor: 'Collect method',
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
            navigate('plan', {
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

export default SoftwareMetrics;
