import {ActionsTypes, AppThunk} from "./redux-store";
import {authApi} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {auth} from "./auth-reducer";


let initialState = {
    initialize: false
}
export type InitialStateAuthType = typeof initialState
export const appReducer = (state: InitialStateAuthType = initialState, action: ActionsTypes): InitialStateAuthType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {
                ...state,
                initialize: true
            }
        default:
            return state
    }
}
export const initializedSuccess = () => {
    return {
        type: "INITIALIZED-SUCCESS",
    } as const
}

export const initialize = () => {
    return (dispatch: any) => {
        let promise = dispatch(auth())
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }
}


//type
export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type AuthType = {
    id?: number,
    email: string,
    login: string,
    resultCode: number,
    messages: Array<string>
}
