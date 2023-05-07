import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {useDispatch} from "react-redux";
import {getProfilePage, getProfileStatus} from "../../redux/profile-reducer";
import {useAppSelector} from "../../redux/redux-store";
import { useParams} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";

function ProfileContainer() {

    const dispatch = useDispatch()
    const profile = useAppSelector((state) => state.profilePage.profile)
    const status = useAppSelector((state) => state.profilePage.status)
    const authorizedUserId= useAppSelector(state => state.auth.id)
    const isAuth=useAppSelector(state => state.auth.isAuth)
    let userId = useParams().userId
    if (!userId) {
        userId = authorizedUserId?.toString()
    }

    useEffect(() => {
        if (isAuth){
            dispatch(getProfilePage(userId))
            dispatch(getProfileStatus(userId))
        }
    }, [dispatch,userId,isAuth])

    return (
        <WithAuthRedirect>
            <Profile profile={profile} status={status} isOwner = {!!userId} />
        </WithAuthRedirect>

    )
}
export default ProfileContainer


