using AllEars.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace AllEars.Server.Repositories
{
    public class AllEarsContext : DbContext
    {
        public DbSet<Login> Logins { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ClinicalPsychologist> ClinicalPsychologists { get; set; }
        public DbSet<CounsellingPsychologist> CounsellingPsychologists { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<ClinicalDoctorAvailability> ClinicalDoctorAvailabilities { get; set; }
        public DbSet<CounsellingDoctorAvailability> CounsellingDoctorAvailabilities { get; set; }
        public DbSet<BookAppointment> BookAppointments { get; set; }
        public DbSet<Billing> Billings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            string conn = @"server=localhost;port=3306;user=root;password=root;database=AllEars";
            optionsBuilder.UseMySQL(conn);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Login>(entity =>
            {
                entity.HasNoKey();  
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Password).IsRequired().HasMaxLength(255);
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.admin_id);
                entity.Property(e => e.admin_name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.admin_email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.admin_password).IsRequired().HasMaxLength(50);
               // entity.ToTable("Admin");
            });
            modelBuilder.Entity<Admin>().ToTable("Admin");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.category_id);
                entity.Property(e => e.category_name).IsRequired().HasMaxLength(100);
                //entity.ToTable("Category");
            });
            modelBuilder.Entity<Category>().ToTable("Category");

            modelBuilder.Entity<ClinicalPsychologist>(entity =>
            {
                entity.HasKey(e => e.clinicalDoctor_id);
                entity.Property(e => e.clinicalDoctor_name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.clinicalDoctor_email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.clinicalDoctor_password).IsRequired().HasMaxLength(255);
                entity.Property(e => e.clinicalDoctor_specialization).IsRequired().HasMaxLength(100);
                entity.Property(e => e.clinicalDoctor_qualification).HasMaxLength(100);
                entity.Property(e => e.address).HasMaxLength(255);
                entity.Property(e => e.category_id).IsRequired();

                
            });
            modelBuilder.Entity<ClinicalPsychologist>().ToTable("ClinicalPsychologist");

            modelBuilder.Entity<CounsellingPsychologist>(entity =>
            {
                entity.HasKey(e => e.counsellingDoctor_id);
                entity.Property(e => e.counsellingDoctor_name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.counsellingDoctor_email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.counsellingDoctor_password).IsRequired().HasMaxLength(255);
                entity.Property(e => e.counsellingDoctor_specialization).IsRequired().HasMaxLength(100);
                entity.Property(e => e.counsellingDoctor_qualification).HasMaxLength(100);
                entity.Property(e => e.address).HasMaxLength(255);
                entity.Property(e => e.category_id).IsRequired();

                
            });
            modelBuilder.Entity<CounsellingPsychologist>().ToTable("CounsellingPsychologist");

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.patient_id);
                entity.Property(e => e.patient_name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.patient_email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.patient_password).IsRequired().HasMaxLength(50);
                entity.Property(e => e.patient_gender).HasMaxLength(10);
                entity.Property(e => e.patient_age).IsRequired();
                entity.Property(e => e.patient_bloodGroup).HasMaxLength(5);
                entity.Property(e => e.address).HasMaxLength(255);
                

            });
            modelBuilder.Entity<Patient>().ToTable("Patient");

            modelBuilder.Entity<ClinicalDoctorAvailability>(entity =>
            {
                entity.HasKey(e => e.cl_availability_id);
                entity.Property(e => e.cl_available_date).IsRequired();
                entity.Property(e => e.time_slot).IsRequired();
                entity.Property(e => e.doctorId).IsRequired();

                
            });
            modelBuilder.Entity<ClinicalDoctorAvailability>().ToTable("ClinicalDoctorAvailability");

            modelBuilder.Entity<CounsellingDoctorAvailability>(entity =>
            {
                entity.HasKey(e => e.co_availability_id);
                entity.Property(e => e.co_available_date).IsRequired();
                entity.Property(e => e.time_slot).IsRequired();
                entity.Property(e => e.therapistId).IsRequired();

                
            });
            modelBuilder.Entity<CounsellingDoctorAvailability>().ToTable("CounsellingDoctorAvailability");

            modelBuilder.Entity<BookAppointment>(entity =>
            {
                entity.HasKey(e => e.appointment_id);
                entity.Property(e => e.appointment_date).IsRequired();
                entity.Property(e => e.appointment_time).IsRequired();
                entity.Property(e => e.patientId).IsRequired();
                entity.Property(e=>e.clinicalDoctorId).IsRequired();

               
            });
            modelBuilder.Entity<BookAppointment>().ToTable("BookAppointment");

            modelBuilder.Entity<Billing>(entity =>
            {
                entity.HasKey(e => e.billing_id);
                entity.Property(e => e.bill_price).IsRequired();
                entity.Property(e => e.paymentstatus).IsRequired();
                entity.Property(e => e.patientId).IsRequired();
                entity.Property(e => e.clinicalDoctorId).IsRequired();
                entity.Property(e => e.appointment_id).IsRequired();

                
            });
            modelBuilder.Entity<Billing>().ToTable("Billing");
        }
    }
}
