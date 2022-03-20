import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Plan from './Plan';
import About from './About';
import reportWebVitals from './reportWebVitals';

import 'bootswatch/dist/yeti/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='/'>
              Maximum4IoT
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link active'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/about' className='nav-link active'>
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
