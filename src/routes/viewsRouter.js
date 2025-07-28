import { Router } from 'express';
import { verifySign } from "../utils.js";
import ProductService from "../services/product.service.js"; // Corrige la importación
import CartService from "../services/cart.service.js"; // Asegúrate de importar CartService si lo usas

const productService = new ProductService(); // Instancia el servicio
const cartService = new CartService(); // Instancia el servicio si lo usas

const router = Router();

router.get('/products', async (req, res) => {
    const products = await productService.getAllProducts(req.query);

    res.render(
        'products',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs)),
            prevLink: {
                exist: products.prevLink ? true : false,
                link: products.prevLink
            },
            nextLink: {
                exist: products.nextLink ? true : false,
                link: products.nextLink
            }
        }
    )
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productService.getAllProducts(req.query);
    res.render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs))
        }
    )
});

router.get('/cart/:cid', async (req, res) => {
    const response = await cartService.getProductsFromCartByID(req.params.cid);

    if (response.status === 'error') {
        return res.render(
            'notFound',
            {
                title: 'Not Found',
                style: 'index.css'
            }
        );
    }

    res.render(
        'cart',
        {
            title: 'Carrito',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(response.products))
        }
    )
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.redirect("/login");
  }
  const payload = verifySign(token);
  if (!payload || !payload.user) {
    return res.redirect("/login");
  }
  const { first_name, last_name, age, role } = payload.user;
  res.render("profile", { first_name, last_name, age, role });
});


router.get("/failed", (req, res) => {
  res.render("failed");
});

router.get("/recuperar-password", (req, res) => {
    res.render("recuperar-password");
});

router.get("/reset-password", (req, res) => {
    const { token } = req.query;
    res.render("reset-password", { token });
});

export default router;