
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

import { useState } from 'react';
import Refresh from './Refresh';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute = ({ element }) => {

    return isAuthenticated ? element : <Navigate to='/login' />

  }

  return (
    <div>
      <Refresh setIsAuthenticated={setIsAuthenticated} />
      <Routes>

        <Route path='/' element={<Navigate to='/login' />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<PrivateRoute element=<Home /> />}></Route>
      </Routes>
    </div>
  );
}

export default App;
