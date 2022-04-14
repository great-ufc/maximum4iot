import React from 'react';
import BlockMath from '@matejmazur/react-katex';
import { useLocation } from 'react-router-dom';
import Table from './Table';

export default function Plan() {
  let location = useLocation();

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

  return (
    <div>
      <h1>Plan...</h1>
      <Table
        columns={columns}
        data={location.state.data}
      />
      <pre>{JSON.stringify(location.state, null, 2)}</pre>
    </div>
  );
}
