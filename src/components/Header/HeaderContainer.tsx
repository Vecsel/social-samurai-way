import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/redux-store";
import {Header} from "./Header";
import {auth} from "../../redux/auth-reducer";

export const HeaderContainer = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const login = useAppSelector((state) => state.auth.login)

    return (
        <Header isAuth={isAuth} login={login}/>
    )
}