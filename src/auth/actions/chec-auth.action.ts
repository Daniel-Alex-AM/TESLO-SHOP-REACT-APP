import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const checkAuthAction = async (): Promise<AuthResponse> => {

    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found'); // Si no hay token, salir inmediatamente


    try {
        //Si hay token validar que esté activo
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status')
        localStorage.setItem('token', data.token)

        return data;
    } catch (error) {
        //sí hay token en localstorage
        console.log(error)
        localStorage.removeItem('token') //Había token pero ya no es valido, entonces remover
        throw new Error('Token expired or not valid')
    }
}
