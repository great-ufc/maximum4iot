import React from "react";
import useGoogleSheets from "use-google-sheets";

function Service() {
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

  return data;
}

export default Service;
