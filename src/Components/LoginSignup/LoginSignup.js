
import React, { useState,useEffect } from "react";
import './LoginSignup.css';
import user_icon from '../../Assests/email.png';
import email_icon from '../../Assests/email.png';
import password_icon from '../../Assests/password.png';


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

    const handleSignup = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email) {
            alert('User already registered. Please log in.');
            setAction('Login');
        } else if (username && email && password) {
            const user = { username, email, password };
            localStorage.setItem('user', JSON.stringify(user));
            alert('User registered successfully!');
            setAction('Login');
        } else {
            alert('Please fill all the fields.');
        }
    };

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            if (email === storedUser.email && password === storedUser.password) {
                alert('Login successful!');
                // Perform any additional actions on successful login here
            } else if((email !== storedUser.email && password === storedUser.password) || (email === storedUser.email && password !== storedUser.password)){
                alert('Invalid email or password.');
            }
            else {
            alert('No user found. Please sign up.');
            setAction('Signup');
            }
        }
    };

    const handleAdminLogin = () => {
        // You can replace these credentials with actual admin credentials check logic
        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        if (email === adminEmail && password === adminPassword) {
            alert('Admin login successful!');
            // Redirect to admin page or perform admin-specific actions here
        } else {
            alert('Invalid admin credentials.');
        }
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
                        {action==="Sign Up"?<div></div>:<><div className="forgot-password">Forgot Password? <span>Click Here!</span></div><div className="forgot-password">
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