﻿using System;
using System.Collections.Generic; // Added for ICollection
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AllEars.Server.Entities
{
    public class BookAppointment
    {
        [Key]
        public int appointment_id { get; set; }

        [ForeignKey("Patient")]
        public int patientId { get; set; } // Changed to match database column name

        [ForeignKey("ClinicalPsychologist")]
        public int clinicalDoctorId { get; set; } // Changed to match database column name

        [Required]
        public string appointment_date { get; set; }

        [Required]
        public string appointment_time { get; set; }

       
        // Default constructor
        public BookAppointment() { }

        // Parameterized constructor
        public BookAppointment(int appointment_id, int patient_id, int clinicalDoctor_id, string appointment_date, string appointment_time)
        {
            this.appointment_id = appointment_id;
            this.patientId = patient_id; // Changed to match database column name
            this.clinicalDoctorId = clinicalDoctor_id; // Changed to match database column name
            this.appointment_date = appointment_date;
            this.appointment_time = appointment_time;
        }
    }
}
