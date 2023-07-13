import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductsController,
  paymentController,
  paymentTokenController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/get-products", getProductsController);

router.get("/get-products/:slug", getSingleProductsController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filters", productFilterController);

//product-count
router.get("/product-count", productCountController);

//product-per-page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//payment routes
//token

router.get("/braintree/token", requireSignIn, paymentTokenController);

router.post("/braintree/payment", requireSignIn, paymentController);

export default router;
