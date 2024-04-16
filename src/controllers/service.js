import { Router } from "express";
const router = Router();


router.get("/service", (req, res) => {
    res.render("service");
});


export default router;