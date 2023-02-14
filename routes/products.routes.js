import { Router } from 'express'
import ProductManager from '../controllers/ProductManager';

const routerProduct = Router()
const manager = new ProductManager('src/models/database.json')

routerProduct.get('/', (req, res) => {
    res.send("API PRODUCTS");
});

routerProduct.get('/products', async (req, res) => {
    const productos = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = productos;
    } else {
        data = productos.slice(0, parseInt(limit));
    }
    res.send(data);
});

routerProduct.get("/products/:pid", async (req, res) => {
    const producto = await manager.getProductById(parseInt(req.params.pid));
    producto === null ? res.send("No se encontró el producto") : res.send(product);
});

routerProduct.post('/', async (req, res) => {
    let { titulo, descripcion, codigo, precio, estado, stock, categoria, imagen } = req.body;
    await manager.addProduct(titulo, descripcion, precio, categoria, imagen, codigo, stock, estado)
    res.send("El producto fue añadido a la base de datos");
})

routerProduct.put('/:id', async (req, res) => {
    let data = await manager.updateProduct(req.params.id, req.body)
    res.send(data)
})

routerProduct.delete('/:id', async (req, res) => {
    let data = await manager.deleteProduct(req.params.id)
    res.send(data)
})

export default routerProduct