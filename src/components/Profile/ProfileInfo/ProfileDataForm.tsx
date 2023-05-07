import s from "components/Profile/Profile.module.css";
import React from "react";
import {ProfiledType} from "redux/profile-reducer";
import {SubmitHandler, useForm} from "react-hook-form";

type Props={
    onSubmit:(userId:string,data:any)=>void
    profile:ProfiledType
}
export const ProfileDataForm = (props:Props) => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm<ProfiledType>();
    const onSubmit: SubmitHandler<ProfiledType> = data => {
        console.log(data)
        props.onSubmit(props.profile.userId,data)
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit"/>
        <div>
            <label>Full name:</label>
            <input {...register("fullName")} placeholder="Full Name"/>
        </div>
        <div>
            <label>Looking for a job:</label>
            <input {...register("lookingForAJob")} type={"checkbox"} placeholder="Looking for a job"/>
        </div>
        <div>
            <label>My professional skills:</label>
            <input {...register("lookingForAJobDescription")} placeholder="My professional skills"/>
        </div>
        <div>
            <label>About me:</label>
            <br/>
            <textarea {...register("aboutMe")}  placeholder="About me"/>
        </div>

        <label>Contact:</label>
        <div className={s.contact}>
            <label>facebook</label>
            <input {...register("contacts.facebook")} placeholder="Facebook"/>
            <br/>
            <label>Github</label>
            <input {...register("contacts.github")} placeholder="Github"/>
            <br/>
            <label>vk</label>
            <input {...register("contacts.vk")} placeholder="Vk"/>
            <br/>
            <label>twitter</label>
            <input {...register("contacts.twitter")} placeholder="Twitter"/>
            <br/>
            <label>instagram </label>
            <input {...register("contacts.instagram")} placeholder="Instagram"/>
            <br/>
            <label>website</label> :
            <input {...register("contacts.website")} placeholder="Website"/>
            <br/>
            <label>youtube</label> :
            <input {...register("contacts.youtube")} placeholder="YouTube"/>
            <br/>
        </div>

    </form>
}

