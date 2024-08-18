using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AllEars.Server.Entities
{
    public class CounsellingDoctorAvailability
    {
        [Key]
        public int co_availability_id { get; set; }

        [ForeignKey("counselling_doctor_id")]
        public int therapistId { get; set; }

        //public CounsellingPsychologist CounsellingPsychologist { get; set; }

        [Required]
        public string co_available_date { get; set; }

        [Required]
        public string time_slot { get; set; }

        // Default constructor
        public CounsellingDoctorAvailability() { }

        // Parameterized constructor
        public CounsellingDoctorAvailability(int co_availability_id, int therapistId, string co_available_date, string time_slot)
        {
            this.co_availability_id = co_availability_id;
            this.therapistId = therapistId;
            this.co_available_date = co_available_date;
            this.time_slot = time_slot;
        }
    }
}
