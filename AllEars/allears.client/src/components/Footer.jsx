import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>AllEars</h5>
                        <p>Your companion for mental wellness.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <ul className="list-inline">
                            <li className="list-inline-item"><Link to="/" className="text-white">Home</Link></li>
                            <li className="list-inline-item"><Link to="/about" className="text-white">About Us</Link></li>
                            <li className="list-inline-item"><Link to="/contact" className="text-white">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 text-center">
                        <p>&copy; {new Date().getFullYear()} AllEars. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
