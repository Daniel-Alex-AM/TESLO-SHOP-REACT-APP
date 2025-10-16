import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { currencyFormatter } from "@/lib/currency-formatter"
import { useProducts } from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {

  const { data, isLoading } = useProducts();
  console.log('GET DATA---')
  console.log(data?.products[0])


  if (isLoading) {
    return <CustomFullScreenLoading msg="Cargando productos..." />
  }

  return (
    <div>

      <div className="flex justify-between items-center">
        <AdminTitle title={"Productos"} subtitle={"Aqui puedes ver y administrar tus productos"} />


        <div className="flex justify-end mb-10 gap-4">
          <Link to='/admin/products/new'>
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>


      </div>



      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-1">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {/* <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <img src="https://placehold.co/250x250" alt="Product" className="w-20 h-20 object-cover rounded-md" />
            </TableCell>
            <TableCell>Producto 1</TableCell>
            <TableCell>$250</TableCell>
            <TableCell>Categoria 1</TableCell>
            <TableCell>100 STOCK</TableCell>
            <TableCell>XS, S, L</TableCell>
            <TableCell className="text-right">
              <Link to={'/admin/products/t-shirt-teslo'}>
                Editar
              </Link>
            </TableCell>
          </TableRow> */}


          {
            data?.products.map((producto, ix) => (
              <TableRow key={producto.id}>

                {/* <TableCell className="font-medium">{producto.id}</TableCell> */}
                <TableCell className="font-medium">{ix+1}</TableCell>
                <TableCell>
                  <img src={producto.images[0]} alt={producto.title} className="w-20 h-20 object-cover rounded-md" />
                </TableCell>
                <TableCell>
                  <Link className="hover:text-blue-500 underline" to={`/admin/products/${producto.id}`}>
                    {producto.title}

                  </Link></TableCell>
                <TableCell>{currencyFormatter(producto.price)}</TableCell>
                <TableCell>{producto.tags.join(', ')}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>{producto.sizes.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/products/${producto.id}`}>
                    <PencilIcon
                      className="w-4 h-4 text-blue-500"
                    />
                  </Link>

                </TableCell>

              </TableRow>
            ))
          }


        </TableBody>
      </Table>


      <CustomPagination totalPages={data?.pages ?? 1} />
    </div>
  )
}
