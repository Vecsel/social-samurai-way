import s from "./Users.module.css"
import userPhoto from "../../assets/imges/user-1.png"
import React from "react";
import {UsersType} from "redux/users-reducer";
import {NavLink} from "react-router-dom";


export type UsersPropsType = {
    user: UsersType
    followingInProgress: Array<number>
    unFollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
}

export const User = (props: UsersPropsType) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={"/profile/" + props.user.id}>
                        <img src={props.user.photos.small !== undefined ? userPhoto : props.user.photos.small} className={s.userPhoto}/>
                    </NavLink>

                </div>
                <div>
                    {props.user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.unFollowThunk(props.user.id)
                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.followThunk(props.user.id)
                        }}>Follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
                <span>
                    {"user.location.country"}
                    {"user.location.city"}
                </span>
            </span>
            )

    </div>)


}
