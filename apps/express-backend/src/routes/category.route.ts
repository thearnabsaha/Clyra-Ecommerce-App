import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { AddCategory, DeleteAllProductsByCategory, GetAllCategory, GetProductByCategory } from "../controllers/category.controller";

const router:Router = Router();

router.post("/",jwtAuth, AddCategory);
router.get("/",jwtAuth, GetAllCategory);
router.get("/",jwtAuth, GetProductByCategory);
router.delete("/:slug",jwtAuth, DeleteAllProductsByCategory);
export default router;


