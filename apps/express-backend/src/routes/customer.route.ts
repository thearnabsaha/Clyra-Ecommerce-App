import { Router } from "express";
import { jwtAuthCustomer } from "../middlewares/jwtAuth";
import { CustomerProfile, CustomerSignin, CustomerSignup, GetAllProductsForCustomers, GetProductForCustomers } from "../controllers/customer.controller";

const router:Router = Router();

router.post("/signup", CustomerSignup);
router.post("/signin", CustomerSignin);
router.get("/me", jwtAuthCustomer,CustomerProfile);
router.get("/Products",jwtAuthCustomer, GetAllProductsForCustomers);
router.get("/Products/:id",jwtAuthCustomer, GetProductForCustomers);
export default router;