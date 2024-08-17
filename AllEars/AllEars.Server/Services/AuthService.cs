using AllEars.Server.Entities;
using AllEars.Server.Repositories;
using BCrypt.Net;
using AllEars.Server.Services;

public class AuthService : IAuthService
{
    private readonly IAdminRepository _adminRepository;
    private readonly IPatientRepository _patientRepository;

    public AuthService(IAdminRepository adminRepository, IPatientRepository patientRepository)
    {
        _adminRepository = adminRepository;
        _patientRepository = patientRepository;
    }

    public async Task<object> AuthenticateAsync(Login login)
    {
        // Check for admin first
        var admin = await _adminRepository.GetAdminByEmailAndPassword(login.Email, login.Password);
        if (admin != null)
        {
            Console.WriteLine("admin user");
            return new { Role = "Admin", User = admin };
        }

        // Check for patient if admin not found
        var patient = await _patientRepository.GetPatientByEmailAndPassword(login.Email, login.Password);
        if (patient != null)
        {
            Console.WriteLine("patient user");
            return new { Role = "Patient", User = patient };
        }

        // Return null if neither admin nor patient is found
        return null;
    }

    public async Task<string> RegisterPatientAsync(Patient patient)
    {
        // Check if the email is already in use
        var existingPatient = await _patientRepository.GetPatientByEmailAndPassword(patient.patient_email, patient.patient_password);
        if (existingPatient != null)
        {
            return "Email is already registered";
        }

        // Hash the password before saving
        patient.patient_password = BCrypt.Net.BCrypt.HashPassword(patient.patient_password);

        // Insert the new patient
        bool result = await _patientRepository.Insert(patient);

        if (result)
        {
            return "Registration successful";
        }
        else
        {
            return "Failed to register";
        }
    }
}



//using AllEars.Server.Entities;
//using AllEars.Server.Repositories;
//using AllEars.Server.Services;

//public class AuthService : IAuthService
//{
//    private readonly IAdminRepository _adminRepository;
//    private readonly IPatientRepository _patientRepository;

//    public AuthService(IAdminRepository adminRepository, IPatientRepository patientRepository)
//    {
//        _adminRepository = adminRepository;
//        _patientRepository = patientRepository;
//    }

//    public async Task<object> AuthenticateAsync(Login login)
//    {
//        // Check for admin first
//        var admin = await _adminRepository.GetAdminByEmailAndPassword(login.Email, login.Password);
//        if (admin != null)
//        {
//            Console.WriteLine("admin user");
//            return new { Role = "Admin", User = admin };
//        }

//        // Check for patient if admin not found
//        var patient = await _patientRepository.GetPatientByEmailAndPassword(login.Email, login.Password);
//        if (patient != null)
//        {
//            Console.WriteLine("patient user");
//            return new { Role = "Patient", User = patient };
//        }

//        // Return null if neither admin nor patient is found
//        return null;
//    }
//}
