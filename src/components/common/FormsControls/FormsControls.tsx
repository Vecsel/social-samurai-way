import s from './FormsControls.module.css'
import {Field} from "redux-form";

type Textarea = {
    input: any,
    meta: any,
    children:any
}

 const FormControl=({input, meta,children, ...props}: Textarea)=>{
     const hasError=meta.touched && meta.error
     return (
         <div className={s.formControl + ' ' + (hasError? s.error:'')}>
             <div>
                 {children}
             </div>
             {hasError && <span> {meta.error}</span>}
         </div>
     )
 }

export const Textarea = (props:any) => {
    const {input, meta,children, ...restProps}=props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}
export const Input = (props:any) => {
    const {input, meta,children, ...restProps}=props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}
export const createField = (placeholder:any,name:any,validators:any, component:any,props={},text ='')=>{
    <div>
        <Field placeholder={placeholder} name={name}
        validate={validators} component={component}
        />{text}
    </div>
}
