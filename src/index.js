import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import createRoutes from './routes';

const routes = createRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

reportWebVitals();
