import { IAnnotation } from './annotation.interface';
import { ICategory } from './category.interface';

interface IProduct {
    _id: string;
    name: string;
    model: string;
    description: string;
    brand: string;
    category: ICategory;
    price: number;
    countInStock: number;
    preview: string;
    rating: number;
    images: string[];
    annotations: IAnnotation[];
}

export type { IProduct };
