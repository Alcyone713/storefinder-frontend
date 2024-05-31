import React, { useState,useEffect } from "react";
import './LoginSignup.css';
import user_icon from '../../Assests/person.png';
import email_icon from '../../Assests/email.png'
import password_icon from '../../Assests/password.png';
import { signupUser, loginUser } from "../../Api/authApi";


const LoginSignup = () => {
    const [action,setAction] = useState('Sign Up');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminAction, setAdminAction] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setAction('Login');
        }
    }, []);

    const handleSignup = async () => {
        try {
            const user = { username, email, password, role: 'user' };
            const response = await signupUser(user);
            alert('User registered successfully!');
            setAction('Login');
        } catch (error) {
            alert('There was an error signing up. Please try again.');
            console.error('Error signing up:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const loginRequest = { email, password };
            const response = await loginUser(loginRequest);
    
            if (response && response.token && response.role) {
                console.log(response);
                const { token, role } = response;
                localStorage.setItem('token', token);
    
                if (role === 'admin') {
                    window.location.href = '/admin'; // Replace with your admin page route
                } else {
                    window.location.href = '/home'; // Replace with your home page route
                }
            } else {
                throw new Error('Invalid response from the server');
            }
        } catch (error) {
            alert('Invalid email or password.');
            console.error('Error logging in:', error);
        }
    };

    const handleAdminLogin = () => {
        handleLogin();
    };

    const handleSignupClick = () => {
        if (action === 'Sign Up') {
            handleSignup();
        } else {
            setAction('Sign Up');
        }
    };

    const handleLoginClick = () => {
        if (action === 'Login') {
            handleLogin();
        } else {
            setAction('Login');
        }
    };


    const renderAdminLogin = () => (
        <div className='container'>
            <div className="header">
                <div className="text">Admin Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleAdminLogin}>
                    Login as Admin
                </div>
                <div className="submit gray" onClick={() => setAdminAction(false)}>
                    Back
                </div>
            </div>
        </div>
    );


    return(
        <div className='container'>
            {adminAction ? (
                renderAdminLogin()
            ) : (
                <>
                    <div className='container'>
                        <div className="header">
                            <div className="text">{action}</div>
                            <div className="underline"></div>
                        </div>
                        <div className="inputs">
                            {action==="Login"?<div></div>:<div className="input">
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder="Username" value={username}
                                        onChange={(e) => setUsername(e.target.value)}/>
                            </div>}
                            
                            <div className="input">
                                <img src={email_icon} alt="" />
                                <input type="email" placeholder="Email Id" value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="input">
                                <img src={password_icon} alt="" />
                                <input type="password" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        {action==="Sign Up"?<div></div>:<><div className="forgot-password">
                                <span onClick={() => setAdminAction(true)}>Login as Admin</span>
                            </div></>}
                        
                        <div className="submit-container">
                            <div className={action==="Login"?"submit gray":"submit"} onClick={handleSignupClick}>Sign Up</div>
                            <div className={action==="Sign Up"?"submit gray":"submit"}  onClick={handleLoginClick}>Login</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginSignup;