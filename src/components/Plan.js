import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Plan() {
  let location = useLocation();
  const rows = location.state.data;

  return (
    <div>
      <h1>Plan</h1>
      <table className='table table-hover table-bordered border-secondary align-middle'>
        {rows.map((row) => {
          return (
            <tr>
              <p>Measure: {row['Measure']}</p>
              <p>Description: {row['Description']}</p>
              <p>NFR: {row['NFR']}</p>
              <p>Measurement function: {row['Measurement function']}</p>
              <p>Function in Latex: {row['Function in Latex']}</p>
              <p>Interpretation: {row['Interpretation']}</p>
              <p>Collect method: {row['Collect method']}</p>
              <p>Reference: {row['Reference']}</p>
            </tr>
          );
        })}
      </table>
      {/* <pre>{JSON.stringify(location.state, null, 2)}</pre> */}
    </div>
  );
}
