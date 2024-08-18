using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AllEars.Server.Entities
{
    public class ClinicalDoctorAvailability
    {
        [Key]
        public int cl_availability_id { get; set; }

        [ForeignKey("ClinicalPsychologist")]
        public int doctorId { get; set; }

        [Required]
        public string cl_available_date { get; set; }

        [Required]
        public string time_slot { get; set; }
        public ClinicalDoctorAvailability() { }

        // Parameterized constructor
        public ClinicalDoctorAvailability(int cl_availability_id, int doctorId, string cl_available_date, string time_slot)
        {
            this.cl_availability_id = cl_availability_id;
            this.doctorId = doctorId;
            this.cl_available_date = cl_available_date;
            this.time_slot = time_slot;
        }
    }
}
