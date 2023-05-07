import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/redux-store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {useDispatch} from "react-redux";
import {login} from "../../redux/auth-reducer";
import s from '../common/FormsControls/FormsControls.module.css'

type FromDataType={
    email:string,
    password:string
    rememberMe:boolean
}

export const LoginForm:React.FC<InjectedFormProps<FromDataType>> = (props) => {

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
                <Field type={"checkbox"} name={'rememberMe'} component={Input} /> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
            {props.error && <div className={s.formSummaryError}> {props.error}</div>}
        </form>

    );
};

const LoginReduxForm=reduxForm<FromDataType>({form: 'login'})(LoginForm)

 const Login = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)


    useEffect(() => {
        if (isAuth) navigate("/profile")
    }, [isAuth])

    const onSubmit=(fromData:FromDataType)=>{
        dispatch(login(fromData.email, fromData.password, fromData.rememberMe))
    }

    return (
        <div>
            <h1>Login</h1>
           <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login