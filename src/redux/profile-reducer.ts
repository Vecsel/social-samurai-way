import {ActionsTypes, AppThunk} from "./redux-store";
import {profileApi} from "../api/api";
import {v1} from "uuid";
import {Dispatch} from "redux";


let initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'Yo', likesCount: 2},
        {id: v1(), message: 'What you doing?', likesCount: 15},
    ] as Array<PostType>,
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: '',
        photos: {
            large: '',
            small: ''
        }
    } as ProfiledType,
    status: "",
    myPhoto: '',
    isLoading: false
}
export type InitialStateProfileType = typeof initialState
export const profileReducer = (state: InitialStateProfileType = initialState, action: ActionsTypes): InitialStateProfileType => {
    switch (action.type) {
        case "ADD-POST":
            let NewPost = {
                id: v1(), message: action.NewPostText, likesCount: 0
            }
            return {
                ...state,
                posts: [NewPost, ...state.posts],

            }
        case "SET-USERS-PROFILE":
            return {...state, profile: action.profile}
        case "SET-STATUS":

            return {...state, status: action.status}
        case "DELETE-POST":

            return {...state, posts: state.posts.filter(p=>p.id!=action.postId)}
        default:
            return state
    }
}
export const addPostActionCreator = (NewPostText:string) => {
    return {
        type: "ADD-POST", NewPostText
    } as const
}
export const deletePostActionCreator = (postId:string) => {
    return {
        type: "DELETE-POST", postId
    } as const
}

export const setUserProfile = (profile: ProfiledType) => {
    return {
        type: "SET-USERS-PROFILE", profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: "SET-STATUS", status
    } as const
}
export const updateStatus = (status: string) => {
    return {
        type: "UPDATE-STATUS", status
    } as const
}
export const savePhotoSuccess = (photos: PhotosType) => ({
    type: 'SAVE-PHOTO-SUCCESS',
    photos: photos
} as const)

export const getProfilePage=(userId:string|undefined)=>{
    return (dispatch:Dispatch)=>{
        profileApi.getProfile(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}
export const getProfileStatus=(userId:string|undefined)=>{
    return (dispatch:Dispatch)=>{
        profileApi.getStatus(userId).then(data => {
            dispatch(setStatus(data))
        })
    }
}
export const updateProfileStatus=(status:string)=>{
    return (dispatch:Dispatch)=>{
        profileApi.updateStatus(status).then(data => {
            if (data.resultCode===0){
                dispatch(setStatus(status))
            }

        })
    }
}
export const savePhoto = (photoFile: any): AppThunk => async (dispatch) => {
    const response = await profileApi.savePhoto(photoFile)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (FormData: any) => async (dispatch: any,getState:any) => {
    const userId = getState().auth.userId
    const response = await profileApi.saveProfile(FormData)

    if (response.data.resultCode === 0) {
        dispatch(setUserProfile(userId))
    } else {
        return Promise.reject(response.data.messages[0])
    }
}

//type
export type PhotosType = {
    "small": string,
    "large": string
}

export type ContactsType = {
    facebook: string,
    "website": string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
}

export type ProfiledType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: string,
    photos: PhotosType
}
export type PostType = {
    id: string
    message: string
    likesCount: number
}

