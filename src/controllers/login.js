import { Router } from "express";
const router = Router();

import authentication from "../middleware/authentication.js";

import { randomBytes } from 'crypto';
import cookieParser from "cookie-parser";

router.use(cookieParser());

function genertesessionID() {
    const buffer = randomBytes(16);
    const sessionID = buffer.toString('hex');
    return sessionID;
}

// Login
router.get("/login", (req, res) => {
    if (req.cookies.sessionID) {
        res.redirect("dashbord");
    }else{
        res.render("login");
    }
});

router.post('/logindata', authentication, (req, res) => {
    if (req.login) {
        const sessionId = genertesessionID();
        res.cookie('sessionID', sessionId);
        req.session.user = {
            user_id: req.user._id.toString(),
            email: req.user.email
        }
        if (req.user.email === 'admin@gmail.com') {
            console.log("Admin Login Successfully");
            res.redirect('/admin');
        }
        else {
            console.log("Login Successfully");
            res.redirect('/dashbord');
        }
    } else {
        res.redirect('/login');
    }
});


// LogIn Validation
router.get('/loginvalidation', (req, res) => {
    res.render("loginvalidation");
})

export default router;