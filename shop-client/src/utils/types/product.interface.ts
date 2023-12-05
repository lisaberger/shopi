interface Product {
    _id: string;
    name: string;
    model: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

interface ListOptions {
    page: number;
    perPage: number;
    total: number;
    currentPage: number;
    nextPage: number;
    previousPage: number;
}

type ProductList = Product & ListOptions;

export type { Product, ProductList };
