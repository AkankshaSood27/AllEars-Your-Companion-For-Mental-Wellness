import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">About Us</h2>
            <p className="lead text-center">AllEars is your companion for mental wellness. We provide professional therapy services to help you navigate life's challenges and find peace.</p>
            <div className="row mt-5">
                <div className="col-md-6">
                    <h4>Our Mission</h4>
                    <p>Our mission is to provide accessible and compassionate mental health services to everyone in need. We believe that everyone deserves to be heard and supported.</p>
                </div>
                <div className="col-md-6">
                    <h4>Our Vision</h4>
                    <p>Our vision is a world where mental health is prioritized and everyone has access to the care they need. We strive to be a beacon of hope and healing for those in need.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
