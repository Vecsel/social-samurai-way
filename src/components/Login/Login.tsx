import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/redux-store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {useDispatch} from "react-redux";
import {login} from "../../redux/auth-reducer";
import s from '../common/FormsControls/FormsControls.module.css'

type FromDataType = {
    email: string,
    password: string
    rememberMe: boolean
    captcha: null | string
}

export const LoginForm: React.FC<InjectedFormProps<FromDataType>> = (props) => {
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={'email'} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder={"Password"} type={'password'} name={'password'} component={Input}
                       validate={[requiredField]}
                />
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component={Input}/> Remember me
            </div>

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field placeholder={"Symbols from image"} name={'captcha'} component={Input}
                                  validate={[requiredField]}/>}
            {props.error && <div className={s.formSummaryError}> {props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>

    );
};

const LoginReduxForm = reduxForm<FromDataType>({form: 'login'})(LoginForm)

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

    useEffect(() => {
        if (isAuth) navigate("/profile")
    }, [isAuth])

    const onSubmit = (fromData: FromDataType) => {
        dispatch(login(fromData.email, fromData.password, fromData.rememberMe, fromData.captcha))
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login