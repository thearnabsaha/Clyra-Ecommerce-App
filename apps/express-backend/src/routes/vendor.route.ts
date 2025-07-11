import { Router } from "express";
import { VendorSignin, VendorSignup } from "../controllers/vendor.controller";

const router:Router = Router();

router.post("/signup", VendorSignup);
router.post("/signin", VendorSignin);

export default router;