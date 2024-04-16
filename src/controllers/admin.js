import { Router } from "express";
const router = Router();


// MODELS
import User from '../../src/models/user_model.js';
import Doctor from '../../src/models/doctor_model.js';
import Appointment from '../../src/models/apoointment_model.js';

// Admin Dashbord
router.get("/admin", async (req, res) => {
    try {
        const doctorsCount = await Doctor.countDocuments();
        const patientsCount = await User.countDocuments();
        const appointmentsCount = await Appointment.countDocuments();
        const visitedCount = await Appointment.countDocuments({ status: "Visited" });
        const cancelledCount = await Appointment.countDocuments({ status: "Cancelled" });
        const scheduledCount = await Appointment.countDocuments({ status: "Scheduled" });

        res.render("admin", {
            number_of_doctors: doctorsCount,
            number_of_patients: patientsCount-1,
            number_of_appointments: appointmentsCount,
            visited_appointments: visitedCount,
            cancelled_appointments: cancelledCount,
            scheduled_appointments: scheduledCount,
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Admin Appointments
router.get("/admin/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('user_id');
        res.render('./../src/components/admin_appointment', {
            appointments: appointments,
        });
    } catch (error) {
        console.log(error);
    }
});

// Admin Doctor
router.get('/admin/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.render('./../src/components/admin_doctor', {
            doctors: doctors,
        });
    } catch (error) {
        console.log(error);
    }
});

// Admin Patient
router.get('/admin/patients', async (req, res) => {
    try {
        const patients = await User.find();
        res.render('./../src/components/admin_patient', {
            patients: patients,
        });
    } catch (error) {
        console.log(error);
    }
});

// Admin Delete Data
router.get("/fetchData", async (req, res) => {
    let type = req.query.type;
    if (type === "doctor") {
        try {
            await Doctor.deleteOne({ _id: req.query.id });
            console.log("Doctor Deleted");
            res.redirect("/admin#doctors");
        } catch (error) {
            console.log(error);
        }
    } else if (type === "patient") {
        try {
            await User.deleteOne({ _id: req.query.id });
            console.log("Patient Deleted");
            res.redirect("/admin#patients");
        } catch (error) {
            console.log(error);
        }
    }
    else {
        try {
            await Appointment.deleteOne({ _id: req.query.id });
            console.log("Appointment Deleted");
            res.redirect("/admin#appointments");
        } catch (error) {
            console.log(error);
        }
    }
});

//Admin Update data
router.get("/updatedata", async (req, res) => {
    try {
        let appo_update = await Appointment.updateOne({ _id: req.query.id }, { $set: { status: req.query.status } });
        if (req.query.status !== "Scheduled") {
            appo_update = await Appointment.updateOne({ _id: req.query.id }, { $set: { doctor_status: "Available" } });
        } else {
            appo_update = await Appointment.updateOne({ _id: req.query.id }, { $set: { doctor_status: "Not-Available" } });
        }
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
});



export default router;