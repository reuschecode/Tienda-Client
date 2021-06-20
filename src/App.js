import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Administrar from './components/Productos/Administrar';
import NuevoProducto from './components/Productos/NuevoProducto';
import EditarProducto from './components/Productos/EditarProducto';
import EliminarProducto from './components/Productos/EliminarProducto';
import InspeccionarProducto from './components/Productos/InspeccionarProducto';
import Autenticate from './components/Autenticate';
import Page404 from './components/Page404';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={props => <Login {...props}/>} />
        <Route path='/dashboard' component={props => <Dashboard {...props}/>} />
        <Route path='/autenticate' component={props =><Autenticate {...props}/>}/>
        <Route path='/productos/administrar' component={props =><Administrar {...props}/>}/>
        <Route path='/productos/editar/:id' component={props =><EditarProducto {...props}/>}/>
        <Route path='/productos/eliminar/:id' component={props =><EliminarProducto {...props}/>}/>
        <Route path='/productos/inspeccionar/:id' component={props =><InspeccionarProducto {...props}/>}/>
        <Route path='/productos/nuevo' component={props =><NuevoProducto {...props}/>}/>
        <Route path='*' component={Page404}/>
      </Switch>
    </Router>
  );
}

export default App;
