import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";

function Psychologist() {
    const [clinicalPsychologists, setClinicalPsychologists] = useState([]);
    const [counsellingPsychologists, setCounsellingPsychologists] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { categoryId, patient_id, patient_name } = location.state || {};

    useEffect(() => {
        // Fetch psychologists when component mounts
        fetchClinicalPsychologists();
        fetchCounsellingPsychologists();
    }, [categoryId]);

    // Method to fetch Clinical Psychologists
    const fetchClinicalPsychologists = async () => {
        try {
            const response = await axios.get(`https://localhost:5265/api/ClinicalPsychologist/bycategory/${categoryId}`);
            setClinicalPsychologists(response.data);
        } catch (error) {
            console.error("Error fetching clinical psychologists", error);
        }
    };

    // Method to fetch Counselling Psychologists
    const fetchCounsellingPsychologists = async () => {
        try {
            const response = await axios.get(`https://localhost:5265/api/CounsellingPsychologist/bycategory/${categoryId}`);
            setCounsellingPsychologists(response.data);
        } catch (error) {
            console.error("Error fetching counselling psychologists", error);
        }
    };

    const handleBookSession = (type, psychologist) => {
        // Navigate to BookAppointment.jsx with selected psychologist details
        navigate("/book-appointment", {
            state: {
                type,
                psychologist,
                patient_id,
                patient_name
            }
        });
    };

    const renderPsychologistCard = (psychologist, type) => (
        <div key={psychologist.id} className="card mb-4 shadow-sm">
            <div className="card-body text-center">
                <img 
                    src={psychologist.profilePictureUrl} 
                    alt={`${type} Psychologist`} 
                    className="img-thumbnail mb-3" 
                    style={{ width: "150px", height: "150px", objectFit: "cover" }} 
                />
                <h6>{psychologist.name}</h6>
                <p>{psychologist.specialization}</p>
                <p><strong>Qualification:</strong> {psychologist.qualification}</p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => handleBookSession(type, psychologist)}
                >
                    Book a Session
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Select a Psychologist</h2>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <h5 className="text-center mb-3">Clinical Psychologists</h5>
                    {clinicalPsychologists.length > 0 ? (
                        clinicalPsychologists.map(psychologist => 
                            renderPsychologistCard({
                                id: psychologist.clinicalDoctor_id,
                                name: psychologist.clinicalDoctor_name,
                                specialization: psychologist.clinicalDoctor_specialization,
                                qualification: psychologist.clinicalDoctor_qualification,
                                profilePictureUrl: psychologist.profilePictureUrl
                            }, 'Clinical')
                        )
                    ) : (
                        <p>No clinical psychologists found for this category.</p>
                    )}
                </div>
                <div className="col-md-6 mb-4">
                    <h5 className="text-center mb-3">Counselling Psychologists</h5>
                    {counsellingPsychologists.length > 0 ? (
                        counsellingPsychologists.map(psychologist => 
                            renderPsychologistCard({
                                id: psychologist.counsellingDoctor_id,
                                name: psychologist.counsellingDoctor_name,
                                specialization: psychologist.counsellingDoctor_specialization,
                                qualification: psychologist.counsellingDoctor_qualification,
                                profilePictureUrl: psychologist.profilePictureUrl
                            }, 'Counselling')
                        )
                    ) : (
                        <p>No counselling psychologists found for this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Psychologist;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation } from "react-router-dom";

// function Psychologist() {
//     const [clinicalPsychologists, setClinicalPsychologists] = useState([]);
//     const [counsellingPsychologists, setCounsellingPsychologists] = useState([]);
//     const location = useLocation();
//     const { categoryId } = location.state || {};

//     useEffect(() => {
//         // Fetch psychologists when component mounts
//         fetchClinicalPsychologists();
//         fetchCounsellingPsychologists();
//     }, [categoryId]);

//     // Method to fetch Clinical Psychologists
//     const fetchClinicalPsychologists = async () => {
//         try {
//             const response = await axios.get(`https://localhost:5265/api/ClinicalPsychologist/bycategory/${categoryId}`);
//             setClinicalPsychologists(response.data);
//         } catch (error) {
//             console.error("Error fetching clinical psychologists", error);
//         }
//     };

//     // Method to fetch Counselling Psychologists
//     const fetchCounsellingPsychologists = async () => {
//         try {
//             const response = await axios.get(`https://localhost:5265/api/CounsellingPsychologist/bycategory/${categoryId}`);
//             setCounsellingPsychologists(response.data);
//         } catch (error) {
//             console.error("Error fetching counselling psychologists", error);
//         }
//     };

//     // Method to handle booking a session
//     const handleBookSession = (psychologist) => {
//         // Add logic to handle booking session, e.g., navigating to a booking page or opening a modal
//         console.log(`Booking session with ${psychologist.name}`);
//         // You can use navigate or other logic to proceed with booking
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4 text-center">Select a Psychologist</h2>
//             <div className="row">
//                 <div className="col-md-6 mb-4">
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <h5 className="card-title">Clinical Psychologists</h5>
//                             {clinicalPsychologists.length > 0 ? (
//                                 <ul className="list-group">
//                                     {clinicalPsychologists.map(psychologist => (
//                                         <li key={psychologist.clinicalDoctor_id} className="list-group-item">
//                                             <h6>{psychologist.clinicalDoctor_name}</h6>
//                                             <p>{psychologist.clinicalDoctor_specialization}</p>
//                                             <button 
//                                                 className="btn btn-primary mt-2" 
//                                                 onClick={() => handleBookSession(psychologist)}
//                                             >
//                                                 Book a Session
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No clinical psychologists found for this category.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 mb-4">
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <h5 className="card-title">Counselling Psychologists</h5>
//                             {counsellingPsychologists.length > 0 ? (
//                                 <ul className="list-group">
//                                     {counsellingPsychologists.map(psychologist => (
//                                         <li key={psychologist.counsellingDoctor_id} className="list-group-item">
//                                             <h6>{psychologist.counsellingDoctor_name}</h6>
//                                             <p>{psychologist.counsellingDoctor_specialization}</p>
//                                             <button 
//                                                 className="btn btn-primary mt-2" 
//                                                 onClick={() => handleBookSession(psychologist)}
//                                             >
//                                                 Book a Session
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No counselling psychologists found for this category.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Psychologist;
