import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './pages/header/Header';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import LoginPage from './pages/auth/LoginPage'; // Import the LoginPage component
import RegisterPage from './pages/auth/RegisterPage'; // Import RegisterPage
import ListPatient from './pages/patients/ListPatient';
import PostPatient from './pages/patients/PostPatient';
import EditPatient from './pages/patients/EditPatient';

function App() {
  const location = useLocation(); // Get the current route

  // Define routes where Header should not appear
  const noHeaderRoutes = ['/login', '/register'];

  return (
    <>
      {/* Render Header only if the current route is not in noHeaderRoutes */}
      {!noHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/register' element={<RegisterPage />} /> {/* Register route */}
        <Route path='/login' element={<LoginPage />} /> {/* Login page without Header */}
        <Route path="/patients" element={<ListPatient />} />
        <Route path="/add-patient" element={<PostPatient />} /> {/* Add route for PostPatient */}
        <Route path="/patients/edit/:userId" element={<EditPatient />} /> {/* Correct way to use 'element' */}
        <Route path='*' element={<NoMatch />} /> {/* Route not found */}
      </Routes>
    </>
  );
}

export default App;
