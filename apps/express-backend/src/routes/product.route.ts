import { Router } from "express";
import { AddProduct, DeleteAllProduct, DeleteProduct, GetAllProducts, GetProduct, UpdateProduct } from "../controllers/product.controller";
import { jwtAuthVendor } from "../middlewares/jwtAuth";

const router:Router = Router();

router.post("/",jwtAuthVendor, AddProduct);
router.get("/",jwtAuthVendor, GetAllProducts);
router.get("/:id",jwtAuthVendor, GetProduct);
router.put("/:id",jwtAuthVendor, UpdateProduct);
router.delete("/:id",jwtAuthVendor, DeleteProduct);
router.delete("/",jwtAuthVendor, DeleteAllProduct);

export default router;


