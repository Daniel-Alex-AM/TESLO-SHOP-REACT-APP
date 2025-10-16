import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response"

export const registerAction = async (email: string, pwd: string, fullName: string) => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email,
            fullName,
            password: pwd
        })
        console.log(data)
        return data

    } catch (error) {
        throw error
    }


}
