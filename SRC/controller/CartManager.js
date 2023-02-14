import { promises as fs, existsSync, writeFileSync } from "fs";

class CartManager {
    constructor(productos) {
        this.productos = productos
    }
}

export default CartManager