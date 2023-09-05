import React from "react";
import TableBoot from "react-bootstrap/Table";
import printJS from "print-js";

export default function Plan() {
  const handlePrint = () => {
    printJS({
      printable: "conteudo-para-imprimir", // ID do elemento que você quer imprimir
      type: "html",
      style: "@media print { body { font-size: 12pt } }",
    });
  };

  const step1 = JSON.parse(localStorage.getItem("step1"));
  const step2 = JSON.parse(localStorage.getItem("step2"));
  const step3 = JSON.parse(localStorage.getItem("step3"));

  return (
    <>
      <div id="conteudo-para-imprimir" className="container fluid">
        <center>
          <h1 className="mt-4">Evaluation plan for an IoT System</h1>
        </center>
        <hr></hr>
        <center>
          <h3>Non Funtional Requiriments</h3>
        </center>
        <div className="table-responsive">
          <TableBoot className='table table-hover border-secondary align-middle'>
            <thead className='table-secondary'>
              <tr>
                <th>#</th>
                <th>Non Functional Requiriments</th>
                <th>Description</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {step1.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.NFR}</td>
                    <td>{item.Description}</td>
                    <td>{item.Reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </TableBoot>
        </div>
        <br></br>
        <br></br>
        <center>
          <h3>Artifacts</h3>
        </center>

        <div className="table-responsive">
          <TableBoot className='table table-hover border-secondary align-middle'>
            <thead className='table-secondary'>
              <tr>
                <th>#</th>
                <th>Artifact</th>
                <th>Description</th>
                <th>NFR</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {step2.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.Artifact}</td>
                    <td>{item.Description}</td>
                    <td>{item.NFR}</td>
                    <td>{item.Reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </TableBoot>
        </div>
        <br></br>
        <br></br>
        <center>
          <h3>Software metrics</h3>
        </center>
        <div className="table-responsive">
          <TableBoot className='table table-hover border-secondary align-middle'>
            <thead className='table-secondary'>
              <tr>
                <th>#</th>
                <th>Measure</th>
                <th>Description</th>
                <th>Related NFR</th>
                <th>Measurement function</th>
                <th>Interpretation</th>
                <th>Collect method</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {step3.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.Measure}</td>
                    <td>{item.Description}</td>
                    <td>{item["Related NFR"]}</td>
                    <td>{item["Measurement function"]}</td>
                    <td>{item.Interpretation}</td>
                    <td>{item["Collect method"]}</td>
                    <td>{item.Reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </TableBoot>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary btn-lg active mb-2 mt-4"
          size="lg"
          style={{ backgroundColor: "#186aa4", width: "192px" }}
          onClick={handlePrint}
        >
          Print Out - PDF
        </button>
      </div>
      <center className="mb-4">
        <a  style={{ color: "#186aa4" }} href="/maximum4iot">
          Restart the process.
        </a>
      </center>
    </>
  );
}
