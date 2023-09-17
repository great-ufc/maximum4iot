import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Service from "../service/Service";

function SoftwareMetrics(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = Service(2);

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
        Header: "Related NFR",
        accessor: "Related NFR",
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

  React.useEffect(() => {
    localStorage.setItem("step3", JSON.stringify(selectedRows));
  }, [selectedRows]);

  const [listaNFRs, setlistaNFRs] = useState(null);
  const [resultado, setResultado] = useState(null);

  React.useEffect(() => {
    let step1 = JSON.parse(localStorage.getItem("step1"));
    let NFRs = step1.map((item) => item["NFR"]);
    setlistaNFRs(NFRs);
  }, []);

  React.useEffect(() => {
    if (data && listaNFRs) {
      const filtro = data.filter((item) =>
        listaNFRs.includes(item["Related NFR"])
      );
      setResultado(filtro);
    }
  }, [data, listaNFRs]);

  let [dataB, setDataB] = React.useState([
    {
      Measure: "Dados reais 0",
      Description: "Loading...",
      RelatedNFR: "Loading...",
      MeasurementFunction: "Loading...",
      Interpretation: "Loading...",
      CollectMethod: "Loading...",
      Reference: "Loading...",
    },
  ]);

  React.useEffect(() => {
    if (resultado) {
      setDataB(resultado);
    }
  }, [resultado]);

  const handleNextStep = () => {
    const step3Data = JSON.parse(localStorage.getItem("step3"));
    if (!step3Data || step3Data.length === 0) {
      alert("No Software Metric selected! Try again!");
      window.location.reload();
    } else {
      navigate("/evaluationplan", {
        state: { data: selectedRows },
      });
    }
  };

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
        data={dataB}
        onSelectedRowsClicked={(selectedRow) => setSelectedRows(selectedRow)}
      />

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-primary btn-lg active"
          size="lg"
          style={{ backgroundColor: "#186aa4", width: "392px" }}
          onClick={handleNextStep}
        >
          FINISH MY EVALUATION PLAN
        </button>
      </div>
    </div>
  );
}

export default SoftwareMetrics;
