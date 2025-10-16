import { useAuthStore } from "@/auth/store/auth.store"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router";

export const AutenticatedRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore();

    if (authStatus === 'checking') return null //no devolver ninguna ruta porque el usuario no esta autenticado (o si?)
    if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

    return children
}

export const NotAutenticatedRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore();

    if (authStatus === 'checking') return null //no devolver ninguna ruta porque el usuario no esta autenticado (o si?)
    if (authStatus === 'authenticated') return <Navigate to="/" />

    return children
}


export const AdminRoute = ({ children }: PropsWithChildren) => {
    const { authStatus, isAdmin } = useAuthStore();

    if (authStatus === 'checking') return null //no devolver ninguna ruta porque el usuario no esta autenticado (o si?)
    if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />
    if (!isAdmin()) return <Navigate to="/" />
    
    return children
}

