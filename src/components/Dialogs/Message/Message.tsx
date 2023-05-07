import React from "react";
import m from "./../Dialogs.module.css"



type UserMessage={
    message: string
    id?:number
}
export const Message=(props:UserMessage)=>{
    return (
        <div className={m.m}>
            <div className={m.message}>{props.message}</div>
            <img src={"https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg"}/>

        </div>


    )
}
