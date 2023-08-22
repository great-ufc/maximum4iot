import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import createRoutes from './routes';
import './global.css';

const routes = createRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

reportWebVitals();
