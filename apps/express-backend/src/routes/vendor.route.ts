import { Router } from "express";
import { VendorProfile, VendorSignin, VendorSignup } from "../controllers/vendor.controller";
import { jwtAuthVendor } from "../middlewares/jwtAuth";

const router:Router = Router();

router.post("/signup", VendorSignup);
router.post("/signin", VendorSignin);
router.get("/me", jwtAuthVendor,VendorProfile);

export default router;