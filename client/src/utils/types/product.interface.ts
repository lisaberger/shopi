import { Annotation } from './annotation.interface';

interface Product {
    _id: string;
    name: string;
    model: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    preview: string;
    countInStock: number;
    rating: number;
    numReviews: number;
    annotations: Annotation[];
}

export type { Product };
