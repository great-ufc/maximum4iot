import React from 'react';
import useGoogleSheets from 'use-google-sheets';
import { useNavigate } from 'react-router-dom';
import BlockMath from '@matejmazur/react-katex';
import Table from './Table';

function Home(props) {
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
  }

  if (error) {
    console.log('Error!');
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Measure',
        accessor: 'Measure', // accessor is the "key" in the data
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
        id: 'Function in Latex',
        Header: 'Measurement function',
        //accessor: 'Function in Latex',
        accessor: (row) => {
          return (
            <BlockMath>
              {String.raw`
                ${row['Function in Latex']}
                `}
            </BlockMath>
          );
        },
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

  //console.log(data);
  /* data = data.map(function (item) {
    item['Function in Latex'] = 'b ' + item['Function in Latex'];
    return item;
  });  */

  /*
  (
    <BlockMath>
      {String.raw`
        X = \frac{A}{T}\\A = \textup{number of cases encountered by the users with}\\\\\textup{the disconnection in the system beyond allowable}\\\\
        `}
    </BlockMath>
  )
  */

  return (
    <div>
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

      {/* <pre>{JSON.stringify(selectedRows, null, 2)}</pre> */}
    </div>
  );
}

export default Home;
