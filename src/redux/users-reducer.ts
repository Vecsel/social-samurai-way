import {ActionsTypes} from "./redux-store";
import {followApi, usersApi} from "../api/api";
import {Dispatch} from "redux";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}

export type InitialStateProfileType = typeof initialState
export const usersReducer = (state: InitialStateProfileType = initialState, action: ActionsTypes): InitialStateProfileType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case "SET_USERS":
            return {
                ...state, users: action.users
            }
        case  "SET_CURRENT_PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case  "SET_TOTAL_USERS_COUNT":
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case  "TOGGLE_IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            }
        case  "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


export const follow = (userid: number) => {
    return {
        type: "FOLLOW", userid
    } as const
}
export const unFollow = (userid: number) => {
    return {
        type: "UNFOLLOW", userid
    } as const
}
export const setUsers = (users: Array<UsersType>) => {
    return {
        type: "SET_USERS", users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: "SET_CURRENT_PAGE", currentPage
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: "SET_TOTAL_USERS_COUNT", totalCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: "TOGGLE_IS_FETCHING", isFetching
    } as const
}
export const toggleFollowingProgress = (userId: number, isFetching: boolean) => {
    return {
        type: "TOGGLE_IS_FOLLOWING_PROGRESS", userId, isFetching
    } as const
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: (ActionsTypes: ActionsTypes) => void) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        usersApi.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}
export const unFollowThunk = (userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(userId, true))
    followApi.postUnFollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(unFollow(userId))
        }
        dispatch(toggleFollowingProgress(userId, false))
    })
}

export const followThunk = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(userId, true))
        followApi.postFollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(follow(userId))
            }
            dispatch(toggleFollowingProgress(userId, false))
        })
    }
}

//type

export type UsersType = {

    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}
type UsersLocationType = {
    city: string,
    country: string
}
