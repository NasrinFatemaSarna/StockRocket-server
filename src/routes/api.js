

const express = require("express");
const router = express.Router();
const UserController = require("../controller/UsersController.js");
const AuthVerificationMiddleware = require("../middleware/AuthVerificationMiddleware");
const BrandController = require("../controller/BrandController.js");
const CategoryController = require("../controller/CategoryController.js");
const ProductController = require("../controller/ProductController.js");
const SuppliersController = require("../controller/SuppliersController.js");
const PurchaseController = require("../controller/PurchaseController.js");
const SalesController = require("../controller/SalesController.js");
const ReturnController = require("../controller/ReturnController.js");
const ExpenseController = require("../controller/ExpenseController.js");
const ReportController = require("../controller/ReportController.js");
const SummaryController = require("../controller/SummaryController.js");

// User routes
router.post("/registration", UserController.Registration )
router.post("/login", UserController.Login )
router.get("/email-verify/:email", UserController.EmailVerify )
router.get("/otp-verify/:email/:otp", UserController.OtpVerify )
router.post("/reset-password", UserController.ResetPassword )
router.get("/profile-details", AuthVerificationMiddleware, UserController.UserDetails )
router.put("/update-profile", AuthVerificationMiddleware, UserController.UserUpdate )


// brand routes
router.post("/create-brand", AuthVerificationMiddleware, BrandController.CreateBrand )
router.get("/brand-details/:id", AuthVerificationMiddleware, BrandController.BrandDetailsById )
router.post("/brand-update/:id", AuthVerificationMiddleware, BrandController.BrandUpdateById )
router.get("/brand-dropdown", AuthVerificationMiddleware, BrandController.BrandDropDown )
router.get("/brand-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, BrandController.BrandList )
router.get("/brand-delete/:id", AuthVerificationMiddleware, BrandController.DeleteBrand )

// category routes
router.get("/create-category", AuthVerificationMiddleware, CategoryController.CreateCategory )
router.get("/category-details/:id", AuthVerificationMiddleware, CategoryController.CategoryDetailsById )
router.post("/category-update/:id", AuthVerificationMiddleware, CategoryController.CategoryUpdateById )
router.get("/category-dropdown", AuthVerificationMiddleware, CategoryController.CategoryDropDown )
router.get("/category-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, CategoryController.CategoryList )
router.get("/category-delete/:id", AuthVerificationMiddleware, CategoryController.DeleteCategory )

// product routes

router.post("/create-product", AuthVerificationMiddleware, ProductController.CreateProduct )
router.get("/product-details/:id", AuthVerificationMiddleware, ProductController.ProductDetailsById )
router.get("/product-dropdown", AuthVerificationMiddleware, ProductController.ProductDropDown )
router.put("/product-update/:id", AuthVerificationMiddleware, ProductController.UpdateProduct )
router.get("/product-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, ProductController.ProductList )

// suppliers route

router.post("/create-supplier", AuthVerificationMiddleware, SuppliersController.CreateSupplier )
router.get("/supplier-details/:id", AuthVerificationMiddleware, SuppliersController.SupplierDetailsById )
router.get("/supplier-dropdown", AuthVerificationMiddleware, SuppliersController.SupplierDropDown )
router.get("/supplier-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, SuppliersController.SupplierList )
router.get("/supplier-delete/:id", AuthVerificationMiddleware, SuppliersController.DeleteSupplier )
router.put("/supplier-update/:id", AuthVerificationMiddleware, SuppliersController.SupplierUpdateById )

// purchase route
router.post("/create-purchase", AuthVerificationMiddleware, PurchaseController.CreatePurchase )
router.get("/purchase-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, PurchaseController.PurchaseList)
router.get("/purchase-delete/:id", AuthVerificationMiddleware, PurchaseController.PurchaseDelete )

// sales route
router.post("/create-sales", AuthVerificationMiddleware, SalesController.CreateSales )
router.get("/sales-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, SalesController.SalesList)
router.get("/sales-delete/:id", AuthVerificationMiddleware, SalesController.SalesDelete )

// return route
router.post("/create-return", AuthVerificationMiddleware, ReturnController.CreateReturn )
router.get("/return-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, ReturnController.ReturnList)
router.get("/return-delete/:id", AuthVerificationMiddleware, ReturnController.ReturnDelete )

// expenses route
router.post("/create-expense", AuthVerificationMiddleware, ExpenseController.CreateExpense  )
router.get("/expense-list/:pageNumber/:perPage/:searchText", AuthVerificationMiddleware, ExpenseController.ExpenseList )
// router.get("/expense-delete/:id", AuthVerificationMiddleware, ExpenseController.ExpenseDelete )



// report route
router.post( "/expense-report", AuthVerificationMiddleware, ReportController.ExpenseReportByDate )
router.post( "/sales-report", AuthVerificationMiddleware, ReportController.SalesReportByDate )
router.post( "/purchase-report", AuthVerificationMiddleware, ReportController.PurchaseReportByDate )
router.post( "/return-report", AuthVerificationMiddleware, ReportController.ReturnReportByDate )

// summary route
router.get( "/expense-summary", AuthVerificationMiddleware, SummaryController.ExpenseSummary )
router.get( "/purchase-summary", AuthVerificationMiddleware, SummaryController.PurchaseSummary )
router.get( "/sales-summary", AuthVerificationMiddleware, SummaryController.SalesSummary )
router.get( "/return-summary", AuthVerificationMiddleware, SummaryController.ReturnSummary )



module.exports = router;   


