import { Router } from "express";
const router = Router();


import userauthentication from "./../middleware/userauthentication.js";

router.get("/signup", (req, res) => {
    res.render("signup");
});


// Doctor Signup
router.post("/doctor-signup", userauthentication, async (req, res) => {
    let newUser = new Doctor({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        spciality: req.body.specility,
        experience: req.body.experience,
        password: req.body.conform_password
    });
    try {
        const user = await newUser.save();
        console.log("Doctor DataSaved Successfully");
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
});

// Patient Signup
router.post("/patient-signup", userauthentication, async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.conform_password
    });
    try {
        const user = await newUser.save();
        console.log("Patient DataSaved Successfully");
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
});

export default router;