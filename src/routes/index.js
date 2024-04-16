
import { Router } from "express";
const router = Router();

import home from './../controllers/home.js';
import service from './../controllers/service.js';
import logout from './../controllers/logout.js';
import signup from './../controllers/signup.js';
import login from './../controllers/login.js';
import dashbord from './../controllers/dashbord.js';
import booking from './../controllers/booking.js';
import admin from './../controllers/admin.js';

// DATABASE
import connectDB from '../db/db.js';

connectDB();

router.use(home);
router.use(service);
router.use(logout);
router.use(signup);
router.use(login);
router.use(dashbord);
router.use(booking);
router.use(admin);


export default router;