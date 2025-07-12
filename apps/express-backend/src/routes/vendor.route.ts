import { Router } from "express";
import { VendorProfile, VendorSignin, VendorSignup } from "../controllers/vendor.controller";
import { jwtAuth } from "../middlewares/jwtAuth";

const router:Router = Router();

router.post("/signup", VendorSignup);
router.post("/signin", VendorSignin);
router.get("/me", jwtAuth,VendorProfile);

export default router;