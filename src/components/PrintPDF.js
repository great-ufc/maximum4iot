import React from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PrintPDF = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
        <button class="btn btn-primary btn-lg active"
            size="lg"
            style={{ backgroundColor: "#186aa4", width: "192px" }}
            onClick={handlePrint}>Print Out - PDF
        </button>
    </div>
  );
};

export default PrintPDF;