import { useState } from 'react'
import {Routes, Route, Navigate, Outlet, Link, useNavigate} from  'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import My-reservations from './pages/my-reservations';
import Dashboard from './pages/Dashboard';

import './App.css'

function ZonaPrivada() {
  // const [count, setCount] = useState(0)

  const navigate = useNavigate();

  if(!localStorage.getItem('token')){
    return <Navigate to="/login" replace />;
  }

  function salir(){
    localStorage.removeItem('token');
    navigate('/login', {replace:true});
  }

  return (
    <>
    <nav className="mb-4 flex gap-4">
    <Link to="/dashboard"> Dashboard </Link>
    <button onClick={salir}> Cerrar sesión</button>
    </nav>
    <Outlet/>
    </>
  );
}

export default function App(){
  return(
    <main className="mx-auto max-w-3xl p-6">
      <Routes>
        <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<ZonaPrivada/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />}/>
      </Routes>
    </main>
  );
}
