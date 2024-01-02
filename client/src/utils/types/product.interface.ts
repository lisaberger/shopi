import { Annotation } from './annotation.interface';
import { Category } from './category.interface';

interface Product {
    _id: string;
    name: string;
    model: string;
    description: string;
    brand: string;
    category: Category;
    price: number;
    countInStock: number;
    preview: string;
    rating: number;
    images: string[];
    annotations: Annotation[];
}

export type { Product };
