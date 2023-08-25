import React, { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

function Artifacts(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = React.useMemo(
    () => [
      {
        Artifacts: "Loading...",
        Description: "Loading...",
        //NFR: 'Loading...',
        "Measurement function": "Loading...",
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
    data = sheetData[1]["data"];
    console.log("Artifacts data:", data);
  }

  if (error) {
    console.log("Error!");
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Artifact",
        accessor: "Artifact",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
      /*{
        Header: 'NFR',
        accessor: 'NFR',
      },*/
      {
        Header: "Reference",
        accessor: "Reference",
      },
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem("step2", JSON.stringify(selectedRows));
    const valor = localStorage.getItem("chave");
    console.log(valor);
  }, [selectedRows]);

  return (
    <div>
      <div className="container fluid mt-4">
        <h4 style={{ color: "#186aa4" }}>
          CHOOSE THE QUALITATIVE EVALUATION TOOLS
        </h4>
        <h5>
          Before starting a qualitative evaluation, it is necessary to plan it,
          clarify its objectives and establish what questions will be answered
          based on its results. The DECIDE method can be used to help plan the
          evaluation, you can access it by clicking here.
        </h5>
      </div>

      <Table
        columns={columns}
        data={data}
        onSelectedRowsClicked={(selectedRow) => setSelectedRows(selectedRow)}
      />

      <div className="d-flex justify-content-center align-items-center">
        <button
          class="btn btn-primary btn-lg active"
          size="lg"
          style={{ backgroundColor: "#186aa4", width: "192px" }}
          onClick={() =>
            navigate("/softwaremetrics", {
              state: { data: selectedRows },
            })
          }
        >
          NEXT STEP
        </button>
      </div>
    </div>
  );
}

export default Artifacts;
