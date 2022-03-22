import { useLocation } from 'react-router-dom';

export default function Plan() {
  let location = useLocation();

  return (
    <div>
      <h1>Plan...</h1>
      <pre>{JSON.stringify(location.state, null, 2)}</pre>
    </div>
  );
}
