import {FC, ReactElement, useEffect} from "react";
import {useAppSelector} from "../redux/redux-store";
import {useNavigate} from "react-router-dom";

type WithAuthRedirectProps = {
    children: ReactElement
}

export const WithAuthRedirect: FC<WithAuthRedirectProps> = ({children}) => {

    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    useEffect(() => {
        if (!isAuth) navigate("/login")
    }, [isAuth])

    return children


}