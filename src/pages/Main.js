import { useState } from "react";
import Table from "../components/Table";
import Home from "./components/Home";
import Artifacts from "./components/Artifacts";
import SoftwareMetrics from "./components/SoftwareMetrics";

export default function Main() {
  const [state, setState] = useState(0);

  const getStateComponent = () => {
    switch (state) {
      case 0:
        return <Home />;
        break;
      case 1:
        return <Artifacts />;
        break;
      case 2:
        return <SoftwareMetrics />;
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Table />
      <div className="d-grid gap-2">
        {getStateComponent()}
        <button
          className="btn btn-lg btn-primary"
          type="button"
          onClick={() => setState(state + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
