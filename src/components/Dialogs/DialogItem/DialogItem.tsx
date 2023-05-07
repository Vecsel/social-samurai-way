import React from "react";
import m from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type UserMess = {
    name: string
    id: number
}
export const UserMess = (props: UserMess) => {
    let path="/messages/" + props.id
    return (
        <div className={m.userMessage}>
            <NavLink to={path}>{props.name} </NavLink>

        </div>
    )
}
