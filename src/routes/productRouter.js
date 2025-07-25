import { Router } from 'express';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import  ProductController  from '../controllers/product.controller.js';
import passport from "passport";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.get('/:pid', productController.getProductByID);

router.post(
    '/',
    passport.authenticate("jwt", { session: false }),
    authorizeRoles("admin"),
    productController.createProduct
);

router.put(
    '/:pid',
    passport.authenticate("jwt", { session: false }),
    authorizeRoles("admin"),
    productController.updateProduct
);

router.delete(
    '/:pid',
    passport.authenticate("jwt", { session: false }),
    authorizeRoles("admin"),
    productController.deleteProduct
);

// router.get('/', async (req, res) => {
//     const result = await ProductService.getAllProducts(req.query);

//     res.send({
//         status: 'success',
//         payload: result
//     });
// });

// router.get('/:pid', async (req, res) => {

//     try {
//         const result = await ProductService.getProductByID(req.params.pid);
//         res.send({
//             status: 'success',
//             payload: result
//         });
//     } catch (error) {
//         res.status(400).send({
//             status: 'error',
//             message: error.message
//         });
//     }
// });

// router.post('/', uploader.array('thumbnails', 3), async (req, res) => {

//     if (req.files) {
//         req.body.thumbnails = [];
//         req.files.forEach((file) => {
//             req.body.thumbnails.push(file.path);
//         });
//     }

//     try {
//         const result = await ProductService.createProduct(req.body);
//         res.send({
//             status: 'success',
//             payload: result
//         });
//     } catch (error) {
//         res.status(400).send({
//             status: 'error',
//             message: error.message
//         });
//     }
// });

// router.put('/:pid', uploader.array('thumbnails', 3), async (req, res) => {

//     if (req.files) {
//         req.body.thumbnails = [];
//         req.files.forEach((file) => {
//             req.body.thumbnails.push(file.filename);
//         });
//     }

//     try {
//         const result = await ProductService.updateProduct(req.params.pid, req.body);
//         res.send({
//             status: 'success',
//             payload: result
//         });
//     } catch (error) {
//         res.status(400).send({
//             status: 'error',
//             message: error.message
//         });
//     }
// });

// router.delete('/:pid', async (req, res) => {

//     try {
//         const result = await ProductService.deleteProduct(req.params.pid);
//         res.send({
//             status: 'success',
//             payload: result
//         });
//     } catch (error) {
//         res.status(400).send({
//             status: 'error',
//             message: error.message
//         });
//     }
// });

export default router;