import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

import { LoggedinRoute } from '@/context/LoggedinRoute';
import { AdminRoute } from '@/context/AdminRoute';

function App() {
    return (
       <BrowserRouter>
        <ThemeProvider>
                <UserProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={ <Home/> }></Route>
                        <Route path="/login" element={ <Login/> }></Route>
                        <Route path="/register" element={ <Register/> }></Route>
                        <Route path="/booking" element={ <Booking/> }></Route>

                        <Route path="/profile/:id?" element={
                            <LoggedinRoute>
                                <Profile/>
                            </LoggedinRoute>
                        }></Route>
                        <Route path="/admin" element={
                            <AdminRoute>
                                <Admin/>
                            </AdminRoute>
                        }></Route>

                        <Route path="/verify-email/:token?" element={ <VerifyEmail/> }></Route>
                    </Routes>
                </UserProvider>
            </ThemeProvider>
       </BrowserRouter>
    )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);