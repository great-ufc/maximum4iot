import React from 'react';
import App from './App';
import NonFunctionalRequirements from './components/NonFunctionalRequirements';
import Artifacts from './components/Artifacts';
import SoftwareMetrics from './components/SoftwareMetrics';
import Plan from './components/Plan';
import About from './pages/About';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const createRoutes = () => (
        <React.StrictMode>
            <Router basename="/maximum4iot">
            <Routes>
                <Route path='/' element={<App />}>
                <Route index element={<Home />} />
                <Route path='/nonfuncionalrequirements' element={<NonFunctionalRequirements />} />
                <Route path='/artifacts' element={<Artifacts />} />
                <Route path='/softwaremetrics' element={<SoftwareMetrics />}/>
                <Route path='/about' element={<About />} />
                <Route path='/plan' element={<Plan />} />
                </Route>
            </Routes>
            </Router>
        </React.StrictMode>
    );

export default createRoutes