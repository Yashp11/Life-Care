import { Router } from "express";
const router = Router();

import cookieParser from "cookie-parser";
router.use(cookieParser());

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    });
    res.clearCookie('sessionID');
});

export default router;