import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function BookAppointment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, psychologist, patient_id, patient_name } = location.state || {};

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    const allSlots = ["Morning 10:00 am - 11:00 am", "Morning 12:00 pm - 01:00 pm", "Evening 04:00 pm - 05:00 pm", "Evening 06:00 pm - 07:00 pm"];
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSlotChange = (e) => {
        setSelectedSlot(e.target.value);
    };

    // const handleConfirm = () => {
    //     const billingInfo = {
    //         psychologist,
    //         patient_name,
    //         type,
    //         selectedDate,
    //         selectedSlot,
    //         fee: type === "Clinical" ? 1500 : 0 // 1500 for Clinical, 0 for Counselling
    //     };

    //     if (type === "Clinical") {
    //         navigate('/billing', { state: billingInfo });
    //     } else {
    //         navigate('/confirmation', { state: billingInfo });
    //     }
    // };

    const handleConfirm = async () => {
        // Validate that all required fields are selected
        if (!selectedDate || !selectedSlot) {
            alert("Please select both date and time slot.");
            return;
        }

        // Prepare the data for submission
        const appointmentData = {
            doctorId: psychologist.id, // Ensure this matches the actual field name
            cl_available_date: selectedDate,
            time_slot: selectedSlot
        };

        try {
            // Post the appointment data to the backend
            await axios.post('https://localhost:5265/api/ClinicalDoctorAvailability/create', appointmentData);
            alert("Appointment booked successfully!");
            // Navigate to the next page based on type
            const billingInfo = {
                psychologist,
                patient_name,
                type,
                selectedDate,
                selectedSlot,
                fee: type === "Clinical" ? 1500 : 0 // 1500 for Clinical, 0 for Counselling
            };
            if (type === "Clinical") {
                navigate('/billing', { state: billingInfo });
            } else {
                navigate('/confirmation', { state: billingInfo });
            }
        } catch (error) {
            console.error("There was an error booking the appointment!", error);
            alert("Failed to book the appointment. Please try again.");
        }
    };

    
    const fetchAvailableSlots = async (date) => {
        try {
            const response = await axios.get(`https://localhost:5265/api/ClinicalDoctorAvailability/getByDate/`, {
                params: { date }
            });
            console.log(response);
            const data = response.data;
        
            setAvailableSlots(response.data.map(slot => slot.time_slot));
        } catch (error) {
            console.error("There was an error fetching the available slots!", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Book a Session with {psychologist.name}</h2>
            <div className="row">
                <div className="col-md-4">
                    <img 
                        src={psychologist.image} 
                        alt={psychologist.name} 
                        className="img-fluid rounded-circle shadow-sm"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card shadow-sm p-4">
                        <h4>{type} Psychologist</h4>
                        <p><strong>Name:</strong> {psychologist.name}</p>
                        <p><strong>Specialization:</strong> {psychologist.specialization}</p>
                        <p><strong>Qualification:</strong> {psychologist.qualification}</p>
                        <p><strong>Patient:</strong> {patient_name}</p>
                        <p><strong>Fee per session:</strong> ₹{type === "Clinical" ? 1500 : "Free"}</p>
                        
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="date">Select Date:</label>
                                <input 
                                    type="date" 
                                    id="date" 
                                    className="form-control" 
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    required 
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="slot">Select Time Slot:</label>
                                <select 
                                    id="slot" 
                                    className="form-control" 
                                    value={selectedSlot}
                                    onChange={handleSlotChange}
                                    required
                                >
                                    <option value="" disabled>Select a time slot</option>
                                    {/* {availableSlots.map(slot => (
                                        allSlots.map(s=> if(s===))
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))} */}
                                     {allSlots.filter(slot => !availableSlots.includes(slot)).map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-primary mt-4"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;





// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function BookAppointment() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { type, psychologist, patient_id, patient_name } = location.state || {};

//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedSlot, setSelectedSlot] = useState("");

//     const handleDateChange = (e) => {
//         setSelectedDate(e.target.value);
//     };

//     const handleSlotChange = (e) => {
//         setSelectedSlot(e.target.value);
//     };

//     const handleConfirm = () => {
//         const billingInfo = {
//             psychologist,
//             patient_name,
//             type,
//             selectedDate,
//             selectedSlot,
//             fee: type === "Clinical" ? 1500 : 0 // 1500 for Clinical, 0 for Counselling
//         };

//         if (type === "Clinical") {
//             navigate('/billing', { state: billingInfo });
//         } else {
//             navigate('/confirmation', { state: billingInfo });
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4 text-center">Book a Session with {psychologist.name}</h2>
//             <div className="row">
//                 <div className="col-md-4">
//                     <img 
//                         src={psychologist.image} 
//                         alt={psychologist.name} 
//                         className="img-fluid rounded-circle shadow-sm"
//                     />
//                 </div>
//                 <div className="col-md-8">
//                     <div className="card shadow-sm p-4">
//                         <h4>{type} Psychologist</h4>
//                         <p><strong>Name:</strong> {psychologist.name}</p>
//                         <p><strong>Specialization:</strong> {psychologist.specialization}</p>
//                         <p><strong>Qualification:</strong> {psychologist.qualification}</p>
//                         <p><strong>Patient:</strong> {patient_name}</p>
//                         <p><strong>Fee per session:</strong> ₹{type === "Clinical" ? 1500 : "Free"}</p>
                        
//                         <form onSubmit={e => e.preventDefault()}>
//                             <div className="form-group">
//                                 <label htmlFor="date">Select Date:</label>
//                                 <input 
//                                     type="date" 
//                                     id="date" 
//                                     className="form-control" 
//                                     value={selectedDate}
//                                     onChange={handleDateChange}
//                                     required 
//                                 />
//                             </div>
//                             <div className="form-group mt-3">
//                                 <label htmlFor="slot">Select Time Slot:</label>
//                                 <select 
//                                     id="slot" 
//                                     className="form-control" 
//                                     value={selectedSlot}
//                                     onChange={handleSlotChange}
//                                     required
//                                 >
//                                     <option value="" disabled>Select a time slot</option>
//                                     <option value="10-11">Morning 10:00 am -11:00 am</option>
//                                     <option value="11-12">Morning 11:00 am -12:00 pm</option>
//                                     <option value="4-5">Evening 4:00 pm -5:00 pm</option>
//                                     <option value="5-6">Evening 5:00 pm -6:00 pm</option>
//                                 </select>
//                             </div>
//                             <button 
//                                 type="button" 
//                                 className="btn btn-primary mt-4"
//                                 onClick={handleConfirm}
//                             >
//                                 Confirm
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BookAppointment;