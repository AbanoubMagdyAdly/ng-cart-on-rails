import { Product } from '../models/product';

export interface CartProduct {
    product: Product;
    count: number;
}
