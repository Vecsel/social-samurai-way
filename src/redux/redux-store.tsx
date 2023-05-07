import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {
    addPostActionCreator, deletePostActionCreator,
    profileReducer, savePhotoSuccess,
    setStatus,
    setUserProfile,
    updateStatus
} from "./profile-reducer";
import {addMessageActionCreator, dialogsReducer} from "./dialogs-reducer";
import {
    follow, setCurrentPage,
    setTotalUsersCount, setUsers,
    toggleIsFetching, toggleFollowingProgress,
    unFollow, usersReducer
} from "./users-reducer";
import {authReducer, setAuthUserData} from "./auth-reducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { reducer as formReducer } from 'redux-form'
import {appReducer, initializedSuccess} from "./app-reducer";


export type ActionsTypes = ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof addMessageActionCreator> |
    ReturnType<typeof deletePostActionCreator> |
    ReturnType<typeof follow>|
    ReturnType<typeof unFollow>|
    ReturnType<typeof setUsers>|
    ReturnType<typeof setCurrentPage>|
    ReturnType<typeof setTotalUsersCount>|
    ReturnType<typeof toggleIsFetching>|
    ReturnType<typeof setUserProfile>|
    ReturnType<typeof toggleFollowingProgress>|
    ReturnType<typeof setStatus>|
    ReturnType<typeof updateStatus>|
    ReturnType<typeof setAuthUserData>|
    ReturnType<typeof initializedSuccess>|
    ReturnType<typeof savePhotoSuccess>






const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form:formReducer,
    app:appReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
// export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsTypes>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>

// @ts-ignore
window.store = store