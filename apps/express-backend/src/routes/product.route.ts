import { Router } from "express";
import { AddProduct, DeleteAllProduct, DeleteProduct, GetAllProducts, GetProduct, UpdateProduct } from "../controllers/product.controller";

const router:Router = Router();

router.post("/", AddProduct);
router.get("/", GetAllProducts);
router.get("/:id", GetProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);
router.delete("/", DeleteAllProduct);

export default router;