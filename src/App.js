import React from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import BlockMath from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import useGoogleSheets from 'use-google-sheets';
import styled from 'styled-components';
import { matchSorter } from 'match-sorter';
//import './App.css';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid blue;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}

function App() {
  // GOOGLE SHEETS
  //console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  //console.log(process.env.REACT_APP_GOOGLE_SHEETS_ID);

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
    refetch,
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
          )
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
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>

      {<div>{JSON.stringify(data)}</div>}
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

export default App;
