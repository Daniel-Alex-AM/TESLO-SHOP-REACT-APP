import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options {
    limit?: number | string;
    offset: number | string | undefined;
    gender?: string;
    sizes?: string;
    minPrice?: number;
    maxPrice?: number;
    query?: string;

}

export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {
    const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            q: query,
        }
    });

    //localhost:3000/api/files/product/8764813-00-A_0_2000.jpg

    const productsWithImageUrl = data.products.map((product) => ({
        ...product,
        images: product.images.map(
            (image) => (`${import.meta.env.VITE_API_URL}/files/product/${image}`))
    }))

    console.log(data)
    return {
        ...data,
        products: productsWithImageUrl
    }
}