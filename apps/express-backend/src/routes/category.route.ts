import { Router } from "express";
import { jwtAuthVendor } from "../middlewares/jwtAuth";
import { AddCategory, DeleteAllCategory, DeleteAllProductsByCategoryHard, DeleteAllProductsByCategorySoft, DeleteCategory, GetAllCategory, GetProductByCategory, UpdateCategory } from "../controllers/category.controller";

const router:Router = Router();

router.post("/",jwtAuthVendor, AddCategory);
router.get("/",jwtAuthVendor, GetAllCategory);
router.delete("/",jwtAuthVendor, DeleteAllCategory);
router.delete("/:name",jwtAuthVendor, DeleteCategory);
router.put("/",jwtAuthVendor, UpdateCategory);
router.get("/product",jwtAuthVendor, GetProductByCategory);
router.delete("/product",jwtAuthVendor, DeleteAllProductsByCategorySoft);
router.delete("/product/hard",jwtAuthVendor, DeleteAllProductsByCategoryHard);
export default router;


