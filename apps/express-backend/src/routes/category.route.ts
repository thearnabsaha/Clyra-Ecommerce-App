import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import { AddCategory, DeleteAllCategory, DeleteAllProductsByCategoryHard, DeleteAllProductsByCategorySoft, DeleteCategory, GetAllCategory, GetProductByCategory, UpdateCategory } from "../controllers/category.controller";

const router:Router = Router();

router.post("/",jwtAuth, AddCategory);
router.get("/",jwtAuth, GetAllCategory);
router.delete("/",jwtAuth, DeleteAllCategory);
router.delete("/:name",jwtAuth, DeleteCategory);
router.put("/",jwtAuth, UpdateCategory);
router.get("/product",jwtAuth, GetProductByCategory);
router.delete("/product",jwtAuth, DeleteAllProductsByCategorySoft);
router.delete("/product/hard",jwtAuth, DeleteAllProductsByCategoryHard);
export default router;


