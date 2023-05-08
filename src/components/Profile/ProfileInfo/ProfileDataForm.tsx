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
        props.onSubmit(props.profile.userId,data)
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit"/>
        <div>
            <label>Full name:</label>
            <input {...register("fullName")} placeholder="Full Name" defaultValue={props.profile.fullName}/>
        </div>
        <div>
            <label>Looking for a job:</label>
            <input {...register("lookingForAJob")} type={"checkbox"} placeholder="Looking for a job" defaultChecked={props.profile.lookingForAJob}/>
        </div>
        <div>
            <label>My professional skills:</label>
            <input {...register("lookingForAJobDescription")} placeholder="My professional skills" defaultValue={props.profile.lookingForAJobDescription}/>
        </div>
        <div>
            <label>About me:</label>
            <br/>
            <textarea {...register("aboutMe")}  placeholder="About me" defaultValue={props.profile.aboutMe}/>
        </div>

        <label>Contact:</label>
        <div className={s.contact}>
            <label>facebook</label>
            <input {...register("contacts.facebook")} placeholder="Facebook" defaultValue={props.profile.contacts.facebook}/>
            <br/>
            <label>Github</label>
            <input {...register("contacts.github")} placeholder="Github" defaultValue={props.profile.contacts.github}/>
            <br/>
            <label>vk</label>
            <input {...register("contacts.vk")} placeholder="Vk" defaultValue={props.profile.contacts.vk}/>
            <br/>
            <label>twitter</label>
            <input {...register("contacts.twitter")} placeholder="Twitter" defaultValue={props.profile.contacts.twitter}/>
            <br/>
            <label>instagram </label>
            <input {...register("contacts.instagram")} placeholder="Instagram" defaultValue={props.profile.contacts.twitter}/>
            <br/>
            <label>website</label> :
            <input {...register("contacts.website")} placeholder="Website" defaultValue={props.profile.contacts.website}/>
            <br/>
            <label>youtube</label> :
            <input {...register("contacts.youtube")} placeholder="YouTube" defaultValue={props.profile.contacts.youtube}/>
            <br/>
        </div>
    </form>
}

