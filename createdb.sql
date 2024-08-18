CREATE DATABASE AllEars;
USE AllEars;

-- Creating Admin table
CREATE TABLE Admin (
    admin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL UNIQUE,
    admin_password VARCHAR(50) NOT NULL
);

CREATE TABLE Patient (
    patient_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    patient_email VARCHAR(255) NOT NULL UNIQUE,
    patient_password VARCHAR(255) NOT NULL,
    patient_gender VARCHAR(10),
    patient_age INT,
    patient_bloodGroup VARCHAR(5),
    address VARCHAR(255)
);

CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Creating CounsellingPsychologist table
CREATE TABLE CounsellingPsychologist (
    counsellingDoctor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    counsellingDoctor_name VARCHAR(255) NOT NULL,
    counsellingDoctor_email VARCHAR(255) NOT NULL UNIQUE,
    counsellingDoctor_password VARCHAR(50) NOT NULL,
    counsellingDoctor_specialization VARCHAR(100) NOT NULL,
    counsellingDoctor_qualification VARCHAR(100),
    address VARCHAR(255),
    category_id INT,
    CONSTRAINT fk_catid FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- Creating ClinicalPsychologist table
CREATE TABLE ClinicalPsychologist (
    clinicalDoctor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    clinicalDoctor_name VARCHAR(255) NOT NULL,
    clinicalDoctor_email VARCHAR(255) NOT NULL UNIQUE,
    clinicalDoctor_password VARCHAR(50) NOT NULL,
    clinicalDoctor_specialization VARCHAR(100) NOT NULL,
    clinicalDoctor_qualification VARCHAR(100),
    address VARCHAR(255),
    imagedata VARCHAR(255),
    category_id INT,
    CONSTRAINT fk_categoryid FOREIGN KEY (category_id) REFERENCES Category(category_id)
);




-- Creating ClinicalDoctorAvailability table
CREATE TABLE ClinicalDoctorAvailability (
    cl_availability_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    doctorId INT,
    cl_available_date varchar(255) NOT NULL,
    time_slot varchar(255) NOT NULL,
    CONSTRAINT fk_id FOREIGN KEY (doctorId) REFERENCES ClinicalPsychologist(clinicalDoctor_id)
);

-- Creating CounsellingDoctorAvailability table
CREATE TABLE CounsellingDoctorAvailability (
    co_availability_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    therapistId INT NOT NULL,
    co_available_date varchar(255) NOT NULL,
    time_slot varchar(255) NOT NULL,
    CONSTRAINT fk_co_id FOREIGN KEY (therapistId) REFERENCES CounsellingPsychologist(counsellingDoctor_id)
);

-- Creating BookAppointment table
CREATE TABLE BookAppointment (
    appointment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    clinicalDoctorId INT NOT NULL,
    appointment_date varchar(255) NOT NULL,
    appointment_time varchar(255) NOT NULL,
    CONSTRAINT fk_patientid FOREIGN KEY (patientId) REFERENCES Patient(patient_id),
    CONSTRAINT fk_doctorid FOREIGN KEY (clinicalDoctorId) REFERENCES ClinicalPsychologist(clinicalDoctor_id)
);

-- Creating Billing table
CREATE TABLE Billing (
    billing_id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    clinicalDoctorId INT,
    appointment_id INT,
    bill_price DOUBLE,
    paymentstatus VARCHAR(25) NOT NULL,
    CONSTRAINT fk_patientid2 FOREIGN KEY (patientId) REFERENCES Patient(patient_id),
    CONSTRAINT fk_doctorid2 FOREIGN KEY (clinicalDoctorId) REFERENCES ClinicalPsychologist(clinicalDoctor_id),
    CONSTRAINT fk_appointmentid FOREIGN KEY (appointment_id) REFERENCES BookAppointment(appointment_id)
);

-- Inserting data into Admin table
INSERT INTO Admin (admin_name, admin_email, admin_password) VALUES
    ('Akanksha', 'akanksha27@gmail.com', 'admin27'),
    ('Pranoti Karade', 'pranoti24@gmail.com', 'admin24');

-- Inserting data into Category table
INSERT INTO category (category_id, category_name) VALUES
(1, 'Anger'),
(2, 'Anxiety and panic attacks'),
(3, 'Bipolar Disorder'),
(4, 'Depression'),
(5, 'Insomnia'),
(6, 'Eating Problems'),
(7, 'PTSD'),
(8, 'Loneliness'),
(9, 'Schizophrenia'),
(10, 'Self-harm'),
(11, 'Stress'),
(12, 'Suicidal thoughts');

-- Inserting data into ClinicalPsychologist table
INSERT INTO clinicalPsychologist (clinicalDoctor_name, clinicalDoctor_email, clinicalDoctor_password, clinicalDoctor_specialization, clinicalDoctor_qualification, address, imagedata, category_id)
VALUES
('Dr. Smith', 'smith_anger@example.com', 'password123', 'Anger Management', 'PhD in Psychology', '123 Main St, City', 'image1.jpg', 1),
('Dr. Johnson', 'johnson_anxiety@example.com', 'password123', 'Anxiety and Panic Disorders', 'PhD in Clinical Psychology', '456 Oak St, City', 'image2.jpg', 2),
('Dr. Williams', 'williams_bipolar@example.com', 'password123', 'Bipolar Disorder', 'MD in Psychiatry', '789 Pine St, City', 'image3.jpg', 3),
('Dr. Brown', 'brown_depression@example.com', 'password123', 'Depression Treatment', 'PhD in Clinical Psychology', '101 Maple St, City', 'image4.jpg', 4),
('Dr. Davis', 'davis_insomnia@example.com', 'password123', 'Insomnia Treatment', 'MD in Psychiatry', '202 Elm St, City', 'image5.jpg', 5),
('Dr. Miller', 'miller_eating@example.com', 'password123', 'Eating Disorder Treatment', 'PhD in Psychology', '303 Birch St, City', 'image6.jpg', 6),
('Dr. Wilson', 'wilson_loneliness@example.com', 'password123', 'Loneliness and Social Anxiety', 'PhD in Clinical Psychology', '404 Cedar St, City', 'image7.jpg', 8),
('Dr. Moore', 'moore_ptsd@example.com', 'password123', 'PTSD Treatment', 'PhD in Psychology', '505 Spruce St, City', 'image8.jpg', 7),
('Dr. Taylor', 'taylor_schizophrenia@example.com', 'password123', 'Schizophrenia Treatment', 'MD in Psychiatry', '606 Willow St, City', 'image9.jpg', 9),
('Dr. Anderson', 'anderson_selfharm@example.com', 'password123', 'Self-harm Prevention', 'PhD in Clinical Psychology', '707 Ash St, City', 'image10.jpg', 10),
('Dr. Thomas', 'thomas_stress@example.com', 'password123', 'Stress Management', 'PhD in Psychology', '808 Fir St, City', 'image11.jpg', 11),
('Dr. Jackson', 'jackson_suicidal@example.com', 'password123', 'Suicidal Thoughts Intervention', 'MD in Psychiatry', '909 Walnut St, City', 'image12.jpg', 12);

-- Inserting data into CounsellingPsychologist table
INSERT INTO counsellingPsychologist (counsellingDoctor_name, counsellingDoctor_email, counsellingDoctor_password, counsellingDoctor_specialization, counsellingDoctor_qualification, address, category_id)
VALUES
('Dr. Green', 'green_anger@example.com', 'password123', 'Anger Management', 'MA in Counseling Psychology', '123 Main St, City', 1),
('Dr. Hall', 'hall_anxiety@example.com', 'password123', 'Anxiety and Panic Disorders', 'MA in Clinical Counseling', '456 Oak St, City', 2),
('Dr. Young', 'young_bipolar@example.com', 'password123', 'Bipolar Disorder', 'MA in Psychology', '789 Pine St, City', 3),
('Dr. Allen', 'allen_depression@example.com', 'password123', 'Depression Counseling', 'MA in Clinical Counseling', '101 Maple St, City', 4),
('Dr. Wright', 'wright_insomnia@example.com', 'password123', 'Insomnia Counseling', 'MA in Psychology', '202 Elm St, City', 5),
('Dr. King', 'king_eating@example.com', 'password123', 'Eating Disorder Counseling', 'MA in Counseling Psychology', '303 Birch St, City', 6),
('Dr. Scott', 'scott_loneliness@example.com', 'password123', 'Loneliness and Social Anxiety', 'MA in Clinical Counseling', '404 Cedar St, City', 8),
('Dr. Adams', 'adams_ptsd@example.com', 'password123', 'PTSD Counseling', 'MA in Psychology', '505 Spruce St, City', 7),
('Dr. Baker', 'baker_schizophrenia@example.com', 'password123', 'Schizophrenia Counseling', 'MA in Clinical Counseling', '606 Willow St, City', 9),
('Dr. Carter', 'carter_selfharm@example.com', 'password123', 'Self-harm Prevention Counseling', 'MA in Counseling Psychology', '707 Ash St, City', 10),
('Dr. Turner', 'turner_stress@example.com', 'password123', 'Stress Management Counseling', 'MA in Psychology', '808 Fir St, City', 11),
('Dr. Parker', 'parker_suicidal@example.com', 'password123', 'Suicidal Thoughts Counseling', 'MA in Clinical Counseling', '909 Walnut St, City', 12);
