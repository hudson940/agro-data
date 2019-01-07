import Dashboard from '../layouts/Dashboard.jsx';
import Register from '../pages/Register.js';
import Login from '../pages/Login.js';

const indexRoutes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/app', component: Dashboard, isPrivate: true },
];

export default indexRoutes;
