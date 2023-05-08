import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "e16f3bce-ad11-4d9c-9112-66e5c83dc530"
    }
})

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    }
}

export const followApi = {
    postUnFollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    postFollow(id: number) {
        return instance.post(`follow/${id}`).then(response => response.data)
    }
}

export const authApi = {
    getAuth() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    Login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
        return instance.post(`auth/login`, {email, password, rememberMe,captcha }).then(response => response.data)
    },
    Logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    },

}
export const profileApi = {
    getProfile(userId: string | undefined) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: string | undefined) {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status}).then(response => response.data)
    },
    savePhoto(photoFile: any) {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: any) {
        return instance.put(`profile`, profile)
    }
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then(response => response.data)
    }
}
