import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Service from "../service/Service";

function SoftwareMetrics(props) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState(null);

  let data = Service();

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

  useEffect(() => {
    localStorage.setItem("step3", JSON.stringify(selectedRows));
  }, [selectedRows]);

  let step1;

  let listaNFRs;

  useEffect(() => {
    step1 = JSON.parse(localStorage.getItem("step1"));
    listaNFRs = step1.map((item) => item["NFR"]);
  }, []);

  const [dataB, setDataB] = useState([
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

  const atualizarDados = (novosDados) => {
    setDataB(novosDados);
  };

  let datafiltred;

  useEffect(() => {
    datafiltred = data.filter((item) => {
      return listaNFRs.includes(item["Related NFR"]);
    });
  }, []);

  useEffect(() => {
    const novosDados = datafiltred.map((item) => ({
      Measure: item.Measure,
      Description: item.Description,
      "Related NFR": item["Related NFR"],
      "Measurement function": item["Measurement function"],
      Interpretation: item.Interpretation,
      "Collect method": item["Collect method"],
      Reference: item.Reference,
    }));

    console.log("NOVOS DADOS AQUI:", novosDados);
    atualizarDados(novosDados);
  }, []);

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
