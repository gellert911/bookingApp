import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from '../context/UserContext';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Booking from './Booking';
import Profile from './Profile';
import Admin from './Admin';
import { LoggedinRoute } from '../context/LoggedinRoute';
import { AdminRoute } from '../context/AdminRoute';

function App() {
    return (
       <BrowserRouter>
            <UserProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={ <Home/> }></Route>
                    <Route path="/login" element={ <Login/> }></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/booking" element={<Booking/>}></Route>

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
                </Routes>
            </UserProvider>
       </BrowserRouter>
    )
}

export default App;
