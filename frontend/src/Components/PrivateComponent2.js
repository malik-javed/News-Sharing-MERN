import React from "react";
import { Navigate,Outlet } from 'react-router-dom';

const PrivatiComponent = () =>{
    const admin = localStorage.getItem('admin');
    return admin ? <Outlet /> : <Navigate to="/adminlogin" />;
}

export default PrivatiComponent;