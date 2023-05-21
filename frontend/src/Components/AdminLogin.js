import './AdminLogin.css';
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from '../Common/Footer';


const AdminLogin = () => {
    let [username, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();
    const adminloginClicked = async () => {
        console.log(username, password);
        let result = await fetch(`https://newsshare-backend.onrender.com/adminlogin`, {
            
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : true 
            }
        });
        try {
            result = await result.json();
            // Process the JSON response here
          } catch (error) {
            console.log('Error:', error);
            // Handle the error appropriately (e.g., display an error message)
          }
          
        // result = await result.json();
        // console.log(result);
        if (result.length > 0) {
            localStorage.setItem('admin', JSON.stringify(result));
            navigate('/adminhome');
        } else {
            alert("Enter Correct Detail");
        }
    }
    return (
        <>
            <div className='row justify-content-center adminlogin-base'>
                <div className='col-md-6 align-self-center text-center adminlogin-main'>
                    <h1>Admin Login</h1>
                    <input type="text" placeholder='Enter Email' className='adminlogin-input'
                        onChange={(e) => setEmail(e.target.value)} value={username}
                    />
                    <input type="password" placeholder='Enter Password' className='adminlogin-input'
                        onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                    <button className='adminlogin-button' onClick={adminloginClicked}>Loign</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AdminLogin;