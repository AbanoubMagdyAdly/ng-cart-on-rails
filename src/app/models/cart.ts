import { Product } from '../models/product';

export interface cartItem {
    id: number;
    product: Product;
    user_id: number;
    product_id: number;
    quantity: number;
}
