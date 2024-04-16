import { Router } from "express";
const router = Router();


router.get("/", (req, res) => {
    res.render("home");
});
router.get("/home", (req, res) => {
    res.render("home");
});


router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});


export default router;