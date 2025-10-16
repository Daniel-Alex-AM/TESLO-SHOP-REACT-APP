import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useParams, useSearchParams } from "react-router"

export const useProducts = () => {

  const [searchParams] = useSearchParams();

  const { gender } = useParams(); // unknown, men, women, kid

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || undefined;
  const prices = searchParams.get('price') || 'any';

  const query = searchParams.get('query') || undefined;

  let minPrice = undefined;
  let maxPrice = undefined;

  switch (prices) {
    case 'any':
      break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;

    case '50-100':
      minPrice = 50;
      maxPrice = 100;
      break;

    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;

    case '200+':
      minPrice = 200;
      break;
  }

  const offset = (Number(page) - 1) * +limit


  return useQuery({
    queryKey: ['products', { limit, offset, gender, sizes, minPrice, maxPrice, query }],
    queryFn: () => getProductsAction({
      limit: isNaN(+limit) ? 9 : limit,
      offset: isNaN(offset) ? 0 : offset,
      gender: gender,
      sizes: sizes,
      minPrice,
      maxPrice,
      query,
    }),
    staleTime: 1000 * 60 * 5
  })
}
