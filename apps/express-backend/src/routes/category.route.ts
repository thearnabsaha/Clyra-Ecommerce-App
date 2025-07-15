import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { AddCategory, DeleteAllProductsByCategoryHard, DeleteAllProductsByCategorySoft, GetAllCategory, GetProductByCategory } from "../controllers/category.controller";

const router:Router = Router();

router.post("/",jwtAuth, AddCategory);
router.get("/",jwtAuth, GetAllCategory);
router.get("/product",jwtAuth, GetProductByCategory);
router.delete("/product",jwtAuth, DeleteAllProductsByCategorySoft);
router.delete("/product/hard",jwtAuth, DeleteAllProductsByCategoryHard);
export default router;


