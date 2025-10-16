// https://github.com/Klerith/bolt-product-editor

import { AdminTitle } from '@/admin/components/AdminTitle';
import { Navigate, useNavigate, useParams } from 'react-router';

import { useState } from 'react';
import { X, Plus, Upload, Tag, SaveAll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   slug: string;
//   stock: number;
//   sizes: string[];
//   gender: string;
//   tags: string[];
//   images: string[];
// }

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data: product, mutation } = useProduct(id || '');


  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  // const handleSubmit = async (productLike: Partial<Product>) => {
  const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {
    // {
    //   "id": "03166f68-45e4-45c3-855a-a3c088d5a038",
    //     "title": "Women's Turbine Cropped Short Sleeve Tee",
    //       "price": 40,
    //         "description": "ntroducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50% polyester.",
    //           "slug": "women_turbine_cropped_short_sleeve_tee",
    //             "stock": "1",
    //               "sizes": [
    //                 "XS",
    //                 "S"
    //               ],
    //                 "gender": "women",
    //                   "tags": [
    //                     "shirt"
    //                   ],
    //                     "user": {
    //     "id": "6fa9f6c6-6d8c-4e3c-9d92-abbdfc87c37f",
    //       "email": "test1@google.com",
    //         "fullName": "Test One",
    //           "isActive": true,
    //             "roles": [
    //               "admin"
    //             ]
    //   },
    //   "images": [
    //     "http://localhost:3000/api/files/product/1741441-00-A_0_2000.jpg",
    //     "http://localhost:3000/api/files/product/1741441-00-A_1.jpg"
    //   ],
    //     "files": [ AQUI SE AGREGAN LAS IMAGENES AL OBJETO PRODUCT
    //      { name: '00275235_p.jpg', lastModified: 1407649675288, lastModifiedDate: Sun Aug 10 2014 00: 47: 55 GMT-0500(hora de verano central), webkitRelativePath: '', size: 140495, … }
    //      { name: '00275235_p.jpg', lastModified: 1407649675288, lastModifiedDate: Sun Aug 10 2014 00: 47: 55 GMT-0500(hora de verano central), webkitRelativePath: '', size: 140495, … }
    //     ]
    // }

    
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('PRODUCTO ACTUALIZADO CORRECTAMENTE', { position: 'top-right' });
        navigate(`/admin/products/${data.id}`)
      },

      onError: (error) => {
        console.log(error);
        toast.error('Error al actualizar el producto')
      }
    })
  }

  // const [product, setProduct] = useState<Product>({
  //   id: '376e23ed-df37-4f88-8f84-4561da5c5d46',
  //   title: "Men's Raven Lightweight Hoodie",
  //   price: 115,
  //   description:
  //     "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
  //   slug: 'men_raven_lightweight_hoodie',
  //   stock: 10,
  //   sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  //   gender: 'men',
  //   tags: ['hoodie'],
  //   images: [
  //     'https://placehold.co/250x250',
  //     'https://placehold.co/250x250',
  //     'https://placehold.co/250x250',
  //     'https://placehold.co/250x250',
  //   ],


  // });



  if (isError) {
    return <Navigate to="/admin/products" />
  }

  if (isLoading) {
    return <CustomFullScreenLoading />
  }

  // const handleInputChange = (field: keyof Product, value: string | number) => {
  //   setProduct((prev) => ({ ...prev, [field]: value }));
  // };


  if (!product) {
    return <Navigate to="/admin/products" />
  }

  return <ProductForm title={title} subtitle={subtitle} product={product} onSubmit={handleSubmit} waiting={mutation.isPending} />

};