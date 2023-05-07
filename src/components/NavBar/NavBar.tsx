import React from "react";
import n from "./NavBar.module.css"
import {NavLink} from "react-router-dom";


export const NavBar = () => {
    return (
        <nav className={n.nav}>
            <div className={`${n.item} ${n.active}`}>
                <NavLink to="/profile" className={({isActive})=>isActive? n.active:""}>Pofile</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/messages" className={({isActive})=>isActive? n.active:""}>Messages</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/users" className={({isActive})=>isActive? n.active:""}>Users</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/news" className={({isActive})=>isActive? n.active:""}>News</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/music"className={({isActive})=>isActive? n.active:""}>Music</NavLink>
            </div>
            <div className={n.item}>
                <NavLink to="/settings" className={({isActive})=>isActive? n.active:""}>Settings</NavLink>
            </div>

        </nav>
    )
}