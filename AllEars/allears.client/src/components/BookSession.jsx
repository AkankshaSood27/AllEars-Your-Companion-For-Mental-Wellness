import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";

function BookSession() {
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { patient_id, patient_name } = location.state || {};

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://localhost:5265/api/Category/get");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId) => {
        // Navigate to the Psychologist page with the selected category
        navigate("/psychologist", { state: { categoryId, patient_id, patient_name } });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Book a Session</h2>
            <div className="row">
                {categories.map(category => (
                    <div key={category.category_id} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{category.category_name}</h5>
                                <p className="card-text">
                                    Choose this category to book a session in {category.category_name}.
                                </p>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleCategorySelect(category.category_id)}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookSession;







// // BookSession.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation, useNavigate } from "react-router-dom";

// function BookSession() {
//     const [categories, setCategories] = useState([]);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { patient_id, patient_name } = location.state || {};

//     useEffect(() => {
//         // Fetch categories from the backend
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("https://localhost:5265/api/Category/get");
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error("Error fetching categories", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleCategorySelect = (categoryId) => {
//         // Navigate to the Psychologist page with the selected category
//         navigate("/psychologist", { state: { categoryId, patient_id, patient_name } });
//     };
    

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4 text-center">Book a Session</h2>
//             <div className="row">
//                 {categories.map(category => (
//                     <div key={category.category_id} className="col-md-4">
//                         <div className="card mb-4 shadow-sm">
//                             <div className="card-body">
//                                 <h5 className="card-title">{category.category_name}</h5>
//                                 <p className="card-text">
//                                     Choose this category to book a session in {category.category_name}.
//                                 </p>
//                                 <button 
//                                     className="btn btn-primary" 
//                                     onClick={() => handleCategorySelect(category.category_id)}
//                                 >
//                                     Select
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default BookSession;
