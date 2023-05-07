import s from "components/Profile/Profile.module.css";
import React from "react";
import {ProfiledType, saveProfile} from "redux/profile-reducer";
import {useAppDispatch, useAppSelector} from "redux/redux-store";
import {SubmitHandler, useForm} from "react-hook-form";

type ProfileDataTypeForm = {
    initialValues?: ProfiledType
}
type Props={
    onSubmit:(data:any)=>void
}
export const ProfileDataForm = (props:Props) => {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<ProfileDataTypeForm>();
    const onSubmit: SubmitHandler<ProfileDataTypeForm> = data => props.onSubmit(data);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit"/>
        <div>
            <label>Full name:</label>
            <input {...register("initialValues.fullName")} placeholder="Full Name"/>
        </div>
        <div>
            <label>Looking for a job:</label>
            <input {...register("initialValues.lookingForAJob")} type={"checkbox"} placeholder="Looking for a job"/>
        </div>
        <div>
            <label>My professional skills:</label>
            <input {...register("initialValues.lookingForAJobDescription")} placeholder="My professional skills"/>
        </div>
        <div>
            <label>About me:</label>
            <br/>
            <textarea {...register("initialValues.aboutMe")}  placeholder="About me"/>
        </div>

        <label>Contact:</label>
        <div className={s.contact}>
            <label>facebook</label>
            <input {...register("initialValues.contacts.facebook")} placeholder="Facebook"/>
            {/*<br/>
            <label>Github</label>
            <input {...register("initialValues.contacts.github")} placeholder="Github"/>
            <br/>
            <label>vk</label>
            <input {...register("initialValues.contacts.vk")} placeholder="Vk"/>
            <br/>
            <label>twitter</label>
            <input {...register("initialValues.contacts.twitter")} placeholder="Twitter"/>
            <br/>
            <label>instagram </label>
            <input {...register("initialValues.contacts.instagram")} placeholder="Instagram"/>
            <br/>
            <label>website</label> :
            <input {...register("initialValues.contacts.website")} placeholder="Website"/>
            <br/>
            <label>youtube</label> :
            <input {...register("initialValues.contacts.youtube")} placeholder="YouTube"/>
            <br/>*/}
        </div>

    </form>
}

