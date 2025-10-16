import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/chec-auth.action'
import { registerAction } from '../actions/register.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    // Properties (valores solo lectura para ver el estado en ese preciso momento)
    user: User | null,
    token: string | null,
    authStatus: AuthStatus

    // Getters (valores computados)
    isAdmin: () => boolean;

    // Actions (funciones que mandamos llamar que hacen modificaciones en el state)
    login: (email: string, pwd: string) => Promise<boolean>,
    logout: () => void,
    checkAuthStatus: () => Promise<boolean>,
    register: (email: string, pwd: string, fullName: string) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Implementacion del Store
    user: null,
    token: null,
    authStatus: 'checking', //estado inicial

    // Getters
    isAdmin: () => {
        const usrRoles = get().user?.roles ?? [];
        return usrRoles.includes('admin')
    },

    // Actions
    login: async (email: string, pwd: string) => {
        console.log(email, pwd)
        try {
            const data = await loginAction(email, pwd);
            localStorage.setItem('token', data.token)

            set({ user: data.user, token: data.token, authStatus: 'authenticated' })

            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false
        }

    },

    logout: () => {
        //const {user} = get()
        //console.log(user)
        localStorage.removeItem('token')
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user,
                token,
                authStatus: 'authenticated'
            })
            return true
        } catch {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })
            return false
        }
    },

    register: async (email: string, pwd: string, fullName: string) => {
        try {
            const data = await registerAction(email, pwd, fullName)
            localStorage.setItem('token', data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true
        } catch {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })
            return false
        }
    }
}))