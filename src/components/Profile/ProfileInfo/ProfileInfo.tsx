import React, {useState} from "react";
import {ProfiledType, updateProfileStatus} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/imges/user-1.png"
import s from '../Profile.module.css'
import {useAppSelector} from "redux/redux-store";
import {ProfileDataForm} from "components/Profile/ProfileInfo/ProfileDataForm";


type ProfileInfoType = {
    profile: ProfiledType
    status: string
    isOwner: boolean
    savePhoto: (photoFile: any) => void
    saveProfile: (FormData: any) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false)

    const updateProfileStatusHandler = (status: string) => {
        dispatch(updateProfileStatus(status))
    }
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit  = (formData: any) => {
        props.saveProfile(formData)
        setEditMode(false)
    }
    return (
        <div>
            <img src={props.profile?.photos.large || userPhoto} className={s.mainPhoto}/>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            {editMode ? <ProfileDataForm onSubmit={onSubmit}/> :
                <ProfileData profile= {props.profile} isOwner={props.isOwner} onEditMode={() => {
                    setEditMode(true)
                }}/>}

            <ProfileStatusWithHooks status={props.status} profile={props.profile}
                                    updateProfileStatus={updateProfileStatusHandler}/>

        </div>
    )
}

type ProfileDataType = {
    profile: ProfiledType
    isOwner: boolean
    onEditMode: () => void
}


const ProfileData = (props: ProfileDataType) => {
    return <div className={s.infoBlock}>
        {props.isOwner && <div>
            <button onClick={props.onEditMode}>Edit</button>
        </div>}
        <div>
            <span style={{margin: 5}}><b>Full name</b> {props.profile?.fullName}</span>
        </div>
        <div>
                        <span
                            style={{margin: 5}}>Looking for a job: {props.profile?.lookingForAJob ? 'yes' : 'no'}</span>
        </div>
        {props.profile?.lookingForAJob &&
            <div>
                            <span
                                style={{margin: 5}}>My professional skills{props.profile?.lookingForAJobDescription}</span>
            </div>
        }
        <div>
            About me:{props.profile?.aboutMe}
        </div>

        <div>
            Contact:
            <div className={s.contact}>
                facebook: {props.profile?.contacts.facebook}
                <br/>
                github: {props.profile?.contacts.github}
                <br/>
                vk: {props.profile?.contacts.vk}
                <br/>
                twitter: {props.profile?.contacts.twitter}
                <br/>
                instagram: {props.profile?.contacts.instagram}
                <br/>
                website: {props.profile?.contacts.website}
                <br/>
                youtube: {props.profile?.contacts.youtube}
                <br/>
            </div>
        </div>
    </div>
}

