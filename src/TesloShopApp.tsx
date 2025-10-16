import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
//import { checkAuthAction } from './auth/actions/chec-auth.action';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {


  const {checkAuthStatus} = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    //queryFn: checkAuthAction,
    queryFn: checkAuthStatus,
    retry: false, //Si falla no reintentar cheeckAuthAction
    refetchInterval: 1000*60*1.5, //que se dispare automaticamente (sin interaccion del usuario) esta peticion dspues de 1.5 horas. SI el usuario refresca manualmente este reset vuelve a 1.5 porque fuerza la recarga
    refetchOnWindowFocus: true //
  })

  if (isLoading) {
    return <CustomFullScreenLoading/>
  }


  return children
}

export const TesloShopApp = () => {





  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {/* Para que cuando se renderice CheckAuthProvider ejecute el usequery que tiene dentro y el router appRouter "va a ver hacia arriba" */}
      <CheckAuthProvider>

        {/* The rest of your application */}
        <RouterProvider router={appRouter}></RouterProvider>

      </CheckAuthProvider>



      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}
