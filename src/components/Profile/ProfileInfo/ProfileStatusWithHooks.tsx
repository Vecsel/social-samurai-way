import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {ProfiledType} from "../../../redux/profile-reducer";

type ProfileInfoType = {
    profile: ProfiledType | null
    status: string
    updateProfileStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileInfoType) => {

    let [status, setStatus] = useState(props.status)
    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateProfileStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <>
            {!editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "---"}</span>
                </div>
                : <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
                           value={status}/>
                </div>
            }
        </>
    )


}