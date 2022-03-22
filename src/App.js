import { Outlet } from 'react-router-dom';

import './App.css';
import Header from './components/Header';

import 'bootswatch/dist/yeti/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  return (
    <div className='container fluid'>
      <Header />
      <div className='row'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
