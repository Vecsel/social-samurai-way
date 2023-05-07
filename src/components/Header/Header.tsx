import React from "react";
import head from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {logout} from "../../redux/auth-reducer";
import {useAppDispatch} from "../../redux/redux-store";

type HeaderType = {
    isAuth: boolean
    login: string | null
}

export const Header = (props: HeaderType) => {
    const dispatch=useAppDispatch()
    return (
        <header className={head.header}>
            <img src={"https://images.satu.kz/163033767_w640_h640_ip-suhie-stroitelnye.jpg"}/>

            <div className={head.loginBlock}>
                {props.isAuth
                    ? <div>
                        {props.login}
                        <button onClick={()=>{dispatch(logout())}}>Logout</button>
                    </div>
                    : <NavLink to={"/login"}>Login</NavLink>}

            </div>
        </header>
    )
}