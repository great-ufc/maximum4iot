import React, { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import "../css/global.css";

function NonFunctionalRequirements(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = React.useMemo(
    () => [
      {
        Measure: "Loading...",
        Description: "Loading...",
        NFR: "Loading...",
        "Measurement function": "Loading...",
        Interpretation: "Loading...",
        "Collect method": "Loading...",
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
    data = sheetData[0]["data"];
  }

  if (error) {
    console.log("Error!");
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "NFR",
        accessor: "NFR",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
      {
        Header: "Reference",
        accessor: "Reference",
      },
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem("step1", JSON.stringify(selectedRows));
  }, [selectedRows]);

  return (
    <div>
      <div className="container fluid mt-4">
        <h4 style={{ color: "#186aa4" }}>CHOOSE THE NFRS</h4>
        <h5>
          {" "}
          At the first stage of the process, the non-functional requirements to
          be assessed are selected. Engaging stakeholders is essential for the
          this fase to ensure that the evaluation is carried out efficiently and
          covers all critical aspects of the sustem to be assessed.{" "}
        </h5>
      </div>

      <Table
        columns={columns}
        data={data}
        onSelectedRowsClicked={(selectedRow) => setSelectedRows(selectedRow)}
      />

      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary btn-lg active mb-4"
          size="lg"
          style={{ backgroundColor: "#186aa4", width: "192px" }}
          onClick={() =>
            navigate("/artifacts", {
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

export default NonFunctionalRequirements;
