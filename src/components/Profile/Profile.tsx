import React, {useEffect} from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {getProfilePage, getProfileStatus, ProfiledType, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {useAppDispatch, useAppSelector} from "redux/redux-store";
import {useParams} from "react-router-dom";

type ProfileType = {
    profile: ProfiledType ;
    status: string
    isOwner:boolean
}

export const Profile = (props: ProfileType) => {
    const dispatch = useAppDispatch()


    const savePhotoCallBack = (photoFile: any) => {
        dispatch(savePhoto(photoFile))
    }
    const saveProfileCallBack = (userId:string,FormData: any) => {
        dispatch(saveProfile(userId,FormData))
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         isOwner={props.isOwner}
                         savePhoto={savePhotoCallBack}
                         saveProfile={saveProfileCallBack}/>
            <MyPostContainer/>
        </div>
    )
}