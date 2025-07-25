import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const router = Router();
const cartController = new CartController();

router.get('/:cid', cartController.getProductsFromCartByID);

router.post('/', cartController.createCart);

router.post('/:cid/product/:pid', cartController.addProductByID);

router.delete('/:cid/product/:pid', cartController.deleteProductByID);

router.put('/:cid', cartController.updateAllProducts);

router.put('/:cid/product/:pid', cartController.updateProductByID);

router.delete('/:cid', cartController.deleteAllProducts);

// router.get('/:cid', async (req, res) => {

//     try {
//         const result = await CartService.getProductsFromCartByID(req.params.cid);
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

// router.post('/', async (req, res) => {

//     try {
//         const result = await CartService.createCart();
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

// router.post('/:cid/product/:pid', async (req, res) => {

//     try {
//         const result = await CartService.addProductByID(req.params.cid, req.params.pid)
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

// router.delete('/:cid/product/:pid', async (req, res) => {

//     try {
//         const result = await CartService.deleteProductByID(req.params.cid, req.params.pid)
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

// router.put('/:cid', async (req, res) => {

//     try {
//         const result = await CartService.updateAllProducts(req.params.cid, req.body.products)
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

// router.put('/:cid/product/:pid', async (req, res) => {

//     try {
//         const result = await CartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity)
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

// router.delete('/:cid', async (req, res) => {

//     try {
//         const result = await CartService.deleteAllProducts(req.params.cid)
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