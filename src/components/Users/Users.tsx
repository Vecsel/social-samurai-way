import s from "./Users.module.css"
import userPhoto from "../../assets/imges/user-1.png"
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "components/common/Paginator/Paginator";

export type UsersPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (p: number) => void,
    users: Array<UsersType>
    followingInProgress: Array<number>
    unFollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
}

export const Users = (props: UsersPropsType) => {

    return <div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
        />
        {
            props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={"/profile/" + u.id}>
                        <img src={u.photos.small !== undefined ? u.photos.small : userPhoto} className={s.userPhoto}/>
                    </NavLink>

                </div>
                <div>
                    {u.followed ?
                        <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.unFollowThunk(u.id)
                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.followThunk(u.id)
                        }}>Follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    {"u.location.country"}
                    {"u.location.city"}
                </span>
            </span>
            </div>)
        }
    </div>


}
