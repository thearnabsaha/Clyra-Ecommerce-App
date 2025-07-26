import { Router } from "express";
import { jwtAuthCustomer } from "../middlewares/jwtAuth";
import { AddProductToCart } from "../controllers/cart.controller";

const router:Router = Router();

router.post("/",jwtAuthCustomer, AddProductToCart);
// router.get("/",jwtAuthCustomer, GetAllCategory);
// router.delete("/",jwtAuthCustomer, DeleteAllCategory);
// router.delete("/:name",jwtAuthCustomer, DeleteCategory);
// router.put("/",jwtAuthCustomer, UpdateCategory);
// router.get("/product",jwtAuthCustomer, GetProductByCategory);
// router.delete("/product/soft",jwtAuthCustomer, DeleteAllProductsByCategorySoft);
// router.delete("/product/hard",jwtAuthCustomer, DeleteAllProductsByCategoryHard);
export default router;


