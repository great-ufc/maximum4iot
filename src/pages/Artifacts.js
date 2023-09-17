import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Service from "../service/Service";

function Artifacts(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = Service(1);

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

  const handleNextStep = () => {
    const step2Data = JSON.parse(localStorage.getItem("step2"));
    if (!step2Data || step2Data.length === 0) {
      alert("No quality evalution tool selected! Try again!");
      window.location.reload();
    } else {
      navigate("/softwaremetrics", {
        state: { data: selectedRows },
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("step2", JSON.stringify(selectedRows));
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
          className="btn btn-primary btn-lg active mb-4"
          size="lg"
          style={{ backgroundColor: "#186aa4", width: "192px" }}
          onClick={handleNextStep}
        >
          NEXT STEP
        </button>
      </div>
    </div>
  );
}

export default Artifacts;
