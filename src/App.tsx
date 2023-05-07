import React, {useEffect} from 'react';
import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import { HashRouter, Route, Routes} from "react-router-dom";
import {News} from "components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";

import {UsersContainer} from "./components/Users/UsersContainer";

import {HeaderContainer} from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {WithAuthRedirect} from "./hoc/withAuthRedirect";
import {auth} from "./redux/auth-reducer";
import {useAppDispatch, useAppSelector} from "./redux/redux-store";
import {initialize, initializedSuccess} from "./redux/app-reducer";
import {PreLoader} from "./components/common/preloader/PreLoader";
const ProfileContainer = React.lazy(()=>import('./components/Profile/ProfileContainer'))

const DialogsContainer = React.lazy(()=>import("./components/Dialogs/DialogsContainer"))


export const App = () => {
    const initialized = useAppSelector(state => state.app.initialize)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(auth())
        dispatch(initialize())
    })
    if (!initialized) {
        return <PreLoader/>
    } else return (
        <HashRouter>
            <div className="App">
                <HeaderContainer/>
                <NavBar/>
                <div className="App-content">
                    <Routes>
                        <Route path="/profile/:userId?" element={
                            <React.Suspense fallback={<div>Loading</div>}>
                                <ProfileContainer/>
                            </React.Suspense>
                        }/>
                        <Route path="/messages" element={<WithAuthRedirect>
                            <React.Suspense fallback={<div>Loading</div>}>
                            <DialogsContainer/>
                            </React.Suspense>
                        </WithAuthRedirect>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}


