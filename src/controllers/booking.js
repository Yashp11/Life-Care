import { Router } from "express";
const router = Router();

import isuserlogin from "../middleware/isuserlogin.js";

import Appointment from "../models/apoointment_model.js";
import Doctor from "../models/doctor_model.js";

// Book Appointment
router.get("/booking", isuserlogin, (req, res) => {
    res.render("booking");
});

router.post("/book", async (req, res) => {
    let new_Apoointment = new Appointment({
        user_id: req.session.user.user_id.toString(),
        name: req.body.name,
        contact: req.body.phone,
        date: req.body.date,
        time: req.body.timezone,
        doctor_name: req.body.doctor
    });
    try {
        const appointment = await new_Apoointment.save();
        console.log("Apoointment Booked");
        res.redirect('/dashbord');
    } catch (error) {
        console.log(error);
    }
});

router.get('/available-doctors', async (req, res) => {
    try {
        const date = req.query.date;
        const time = req.query.time;
        const doctors = await Doctor.find();
        const required_doctors = await Appointment.find({ date: date, time: time, doctor_status: "Not-Available" });
        
        const doctor_name = doctors.map(doctors => doctors.name);
        const requiredDoctors = required_doctors.map(appointment => appointment.doctor_name);
        const available_doctors = doctor_name.filter(doctor => !requiredDoctors.includes(doctor));

        res.json(available_doctors);
    } catch (error) {
        console.log(error);
    }
});

export default router;