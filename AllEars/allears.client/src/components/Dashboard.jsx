
//import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state;

    // Destructure user data
    const { patient_id, patient_name, patient_email } = userData?.user || {};

    // Redirect to login if no user data is present
    if (!userData) {
        navigate("/login");
        return null;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dashboard</h2>
            <div className="card">
                <div className="card-header">
                    <h4>Welcome, {patient_name}</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img
                                src={`/profile_image.png`}
                                alt="Profile"
                                className="img-fluid rounded-circle mb-3"
                            />
                        </div>
                        <div className="col-md-8">
                            <p>
                                <strong>ID:</strong> {patient_id}
                            </p>
                            <p>
                                <strong>Email:</strong> {patient_email}
                            </p>
                            <p>
                                <strong>Name:</strong> {patient_name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;