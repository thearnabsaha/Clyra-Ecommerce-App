import { Router } from "express";
import { VendorSignup } from "../controllers/vendor.controller";

const router:Router = Router();

router.post("/signup", VendorSignup);

export default router;