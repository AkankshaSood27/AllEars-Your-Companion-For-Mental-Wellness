// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
//import './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (value) => {
        setEmail(value);
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const authReq = {
            email: email,
            password: password,
        };
        axios
            .post("https://localhost:5265/api/auth/login", authReq, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/dashboard", { state: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Fragment>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                    <h1 className="text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={handleLogin} type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;