import { CustomJumbotron } from '@/shop/components/CustomJumbotron'
import { CustomPagination } from '@/components/custom/CustomPagination'
import { ProductsGrid } from '@/shop/components/ProductsGrid'
//import { products } from '@/mocks/products.mock'
import { useProducts } from '@/shop/hooks/useProducts'
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading'

export const HomePage = () => {
  const {data, isLoading} = useProducts();

  if (isLoading) {
    return (
     <CustomFullScreenLoading msg='Loading Products...'/>
    )
  }

  return (
    <>
      <CustomJumbotron title={'Todos los productos'}></CustomJumbotron>
      <ProductsGrid products={data?.products || []} productCount={data?.count || 0}/>
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  )
}
