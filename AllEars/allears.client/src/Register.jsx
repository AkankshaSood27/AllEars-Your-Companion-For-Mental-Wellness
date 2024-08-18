// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({
        patient_name: '',
        patient_email: '',
        patient_password: '',
        patient_gender: '',
        patient_age: '',
        patient_bloodGroup: '',
        address: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post("https://localhost:5265/api/auth/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                navigate("/login");
            })
            .catch((error) => {
                console.error(error);
                setError('Registration failed. Please try again.');
            });
    };

    return (
        <Fragment>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
                    <h1 className="text-center mb-4">Register</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                name="patient_name"
                                className="form-control"
                                value={formData.patient_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="patient_email"
                                className="form-control"
                                value={formData.patient_email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="patient_password"
                                className="form-control"
                                value={formData.patient_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Gender</label>
                            <input
                                type="text"
                                name="patient_gender"
                                className="form-control"
                                value={formData.patient_gender}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Age</label>
                            <input
                                type="number"
                                name="patient_age"
                                className="form-control"
                                value={formData.patient_age}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Blood Group</label>
                            <input
                                type="text"
                                name="patient_bloodGroup"
                                className="form-control"
                                value={formData.patient_bloodGroup}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group mb-4">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <button onClick={handleRegister} type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;