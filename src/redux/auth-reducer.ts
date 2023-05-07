import {ActionsTypes, AppThunk} from "./redux-store";
import {authApi} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
}
export type InitialStateAuthType = typeof initialState
export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsTypes): InitialStateAuthType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth:action.isAuth
            }
        default:
            return state
    }
}
export const setAuthUserData = (data: AuthType, isAuth:boolean) => {
    return {
        type: "SET_USER_DATA", data,isAuth
    } as const
}

export const auth = ():AppThunk => (dispatch: Dispatch) => {
       return  authApi.getAuth().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data, true))
            }
        })
    }

export const login = (email:string, password:string, rememberMe:boolean):AppThunk => {
    return (dispatch:any) => {
        authApi.Login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(auth())
            }else{
                let message =data.messages.length>0? data.messages[0]: "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        })
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        authApi.Logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data, false))
            }
        })
    }
}


//type
export type LoginType={
    email:string,
    password:string,
    rememberMe:boolean
}

export type AuthType = {
    id?: number,
    email: string,
    login: string,
    resultCode: number,
    messages: Array<string>
}
