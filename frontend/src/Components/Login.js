import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Common/Footer';

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginClicked = async () => {
        console.log(email, password);
        let result = await fetch(`https://newsshare-backend.onrender.com/login`, {
           
            method: 'post',
            body: JSON.stringify({ email, password }),
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
        
        
        if (result.email) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/home');
        } else {
            alert("Enter Correct Detail");
        }
    }
    return (
        <>
            <div className='row justify-content-center login-page-base'>
                <div className='col-md-6 align-self-center login-main'>
                    <h1>User Login</h1>
                    <input type="text" placeholder='Enter Email' className='login-input-box'
                        onChange={(e) => setEmail(e.target.value)} value={email}
                    />
                    <input type="password" placeholder='Enter Password' className='login-input-box'
                        onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                    <button className='login-button' onClick={loginClicked}>Loign</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Login;