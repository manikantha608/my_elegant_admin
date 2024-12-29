
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import AdminLogin from './components/Login';
import AdminRegister from './components/SignupAdmin';
import AdminProfile from './components/AdminProfile';
import LandingPage from './components/HomePage';
import AllUsers from './components/UsersData';
import AllCompanies from './components/CompaniesData';
import AllJobs from './components/AllJobs';
import React, { useState } from 'react';

const App = () => {
   const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Admin Authentication */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />

                {/* Admin Features */}
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/users" element={<AllUsers />} />
                <Route path="/admin/companies" element={<AllCompanies />} />
                <Route path="/admin/jobs" element={<AllJobs />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
