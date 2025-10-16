//import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface"
import { createUpdateProcutAction } from "../actions/create-update-product.action"

export const useProduct = (id: string) => {

    // const queryClientCurso = new QueryClient();
    const queryClientTanstack = useQueryClient()

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        staleTime: 1000 * 60 * 5,
        retry: false,

        //enabled: !!id //hasta que haya id
    })

    //Esto no se manda llamar inmediatamente cuando el componente se monta
    //Solo se ejecuta cuando lo llamamos mutation.mutate()
    const mutation = useMutation({
        mutationFn: createUpdateProcutAction,
        onSuccess: async (product: Product) => { //Este producto es el resultado del mutationFn
            console.log('TODO SALIÓ BIEN')
            //Invalidar cache

            await Promise.all([
                queryClientTanstack.invalidateQueries({ queryKey: ['products'] }),
                queryClientTanstack.invalidateQueries({ queryKey: ['product', { id: product.id }] }),
            ])

            // Actualizar queryData
            queryClientTanstack.setQueryData(['product', { id: product.id }], product);
        }
    });


    // const handleSubmitForm = async(productLike: Partial<Product>) => {
    //     console.log(productLike)
    // }

    return {
        ...query,
        mutation,
    }
}