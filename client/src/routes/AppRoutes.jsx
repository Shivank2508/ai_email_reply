
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import Inbox from '../pages/Inbox'
import Login from '../pages/Login'
import { Email } from "../pages/Email";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/inbox"
                    element={
                        <Inbox />
                    }
                />
                <Route
                    path="/inbox/:emailId"
                    element={
                        <Email />
                    }
                />
            </Routes>
        </BrowserRouter >
    )
}

export default AppRoutes