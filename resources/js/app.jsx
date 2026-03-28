import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';

import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Booking from '@/pages/Booking';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import VerifyEmail from '@/pages/VerifyEmail';
import PasswordReset from '@/pages/PasswordReset';

import { LoggedinRoute } from '@/context/LoggedinRoute';
import { AdminRoute } from '@/context/AdminRoute';
import { UserContext } from './context/UserContext';


function AppContent() {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/booking" element={<Booking />} />

                <Route path="/users/:id?" element={
                    <LoggedinRoute>
                        <Profile />
                    </LoggedinRoute>
                } />
                <Route path="/admin" element={
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                } />

                <Route path="/verify-email/:token?" element={<VerifyEmail />} />
                <Route path="/password-reset/:token?" element={<PasswordReset />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <ThemeProvider>
                    <AppContent />
                </ThemeProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);