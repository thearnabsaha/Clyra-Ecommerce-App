import { Router } from "express";
import { AddCategory, AddProduct, DeleteAllProduct, DeleteProduct, GetAllCategory, GetAllProducts, GetProduct, UpdateProduct } from "../controllers/product.controller";
import { jwtAuth } from "../middlewares/jwtAuth";

const router:Router = Router();

router.post("/",jwtAuth, AddProduct);
router.post("/category/",jwtAuth, AddCategory);
router.get("/category/",jwtAuth, GetAllCategory);
router.get("/",jwtAuth, GetAllProducts);
router.get("/:id",jwtAuth, GetProduct);
router.put("/:id",jwtAuth, UpdateProduct);
router.delete("/:id",jwtAuth, DeleteProduct);
router.delete("/",jwtAuth, DeleteAllProduct);

export default router;


