import React, { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

function SoftwareMetrics(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = React.useMemo(
    () => [
      {
        Description: "Loading...",
        RelatedNFR: "Loading...",
        MeasurementFunction: "Loading...",
        Interpretation: "Loading...",
        CollectMethod: "Loading...",
        Reference: "Loading...",
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
    console.log("Loading...");
  } else {
    data = sheetData[2]["data"];
    console.log("SoftwareMetrics data:", data);
  }

  if (error) {
    console.log("Error!");
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Measure",
        accessor: "Measure",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
      {
        Header: 'Related NFR',
        accessor: 'Related NFR',
      },
      {
        Header: "Measurement function",
        accessor: "Measurement function",
      },
      {
        Header: "Interpretation",
        accessor: "Interpretation",
      },
      {
        Header: "Collect method",
        accessor: "Collect method",
      },
      {
        Header: "Reference",
        accessor: "Reference",
      },
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem("step3", JSON.stringify(selectedRows));
    //const valor = localStorage.getItem("chave");
    //console.log(valor);
  }, [selectedRows]);

  const step1 = JSON.parse(localStorage.getItem("step1"));
  console.log('RNFs selecionados:', step1);

  console.log('DATA atual:', data);

  
  /*
  const vetor3 = data.filter(element => {
    const parte = element.split(' ')[0]; // Obtém a primeira parte do elemento
    console.log(parte);
    return step1.includes(parte); // Verifica se está no vetor 1
  });
  console.log(vetor3);
  */


  

  return (
    <div className="mt-4">
      <div className="container fluid mt-4">
        <h4 style={{ color: "#186aa4" }}>CHOOSE THE SOFTWARE PROCESS</h4>
        <h5>
          In prima processus parte, eliguntur requisita non functionalia ad
          aestimationem. Essentialis est stakeholders allicere in hac phase ut
          efficienter aestimatio perficiatur et omnia critica systematis, quod
          aestimandum est, comprehendat.
        </h5>
      </div>

      <Table
        columns={columns}
        data={data}
        onSelectedRowsClicked={(selectedRow) => setSelectedRows(selectedRow)}
      />

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-primary btn-lg active"
          size="lg"
          style={{ backgroundColor: "#186aa4", width: "392px" }}
          onClick={() =>
            navigate("/plan", {
              state: { data: selectedRows },
            })
          }
        >
          FINISH MY EVALUATION PLAN
        </button>
      </div>
    </div>
  );
}

export default SoftwareMetrics;
