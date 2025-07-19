import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { CustomerProfile, CustomerSignin, CustomerSignup } from "../controllers/customer.controller";

const router:Router = Router();

router.post("/signup", CustomerSignup);
router.post("/signin", CustomerSignin);
router.get("/me", jwtAuth,CustomerProfile);

export default router;