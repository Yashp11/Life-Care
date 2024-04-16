import { Router } from "express";
const router = Router();
import usertype from "../middleware/usertype.js";


import Appointment from "../models/apoointment_model.js";
import Doctor from "../models/doctor_model.js";

// Dashbord
router.get("/dashbord", usertype, (req, res) => {
    res.render("dashbord", {
        isvalidrole: req.type,
        user: req.user,
        message: "Login Successfully"
    });
});

// FETCH APPOINTMENT DATA ACCORDING TO USER 
router.get("/appointmentData", async (req, res) => {
    const type = req.query.type;
    const id = req.query.id;

    let doctor = await Doctor.findOne({ _id: id });
    if (type == 'doctor') {
        const appointment = (await Appointment.find({ doctor_name: doctor.name })).map(appointment => appointment);
        res.json(appointment);
    } else {
        const appointment = (await Appointment.find({ user_id: id })).map(appointment => appointment);
        res.json(appointment);
    }
});

// Update status
router.get("/updatestatus", async (req, res) => {
    const id = req.query.id;
    const status = req.query.status;
    try {
        let appointent = await Appointment.updateOne({ _id: id }, { $set: { status: status, doctor_status: "Available" } });
        console.log("Appointment Cancelled");
        res.redirect("/dashbord");
    } catch (error) {
        console.log(error);
    }
});


export default router;