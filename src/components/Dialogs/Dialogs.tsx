import React from "react";
import m from "./Dialogs.module.css"
import {Message} from "./Message/Message";
import {UserMess} from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => (<UserMess key={d.id} name={d.name} id={d.id}/>))
    let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message}/>)

    const addNewMessage = (values:any) => {
        props.addMessageAction(values.newMessageText)
    }

    return (
        <div>
            <div className={m.messages}>
                <div>
                    {dialogsElements}
                </div>
                {messagesElements}
            </div>
            <AddMessageFormRedux  onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength100=maxLengthCreator(100)

const AddMessageForm=(props:any)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newMessageText' placeholder='Enter your message' validate={[requiredField, maxLength100]}/>
            </div>
        <button>Send</button>
    </form>
    )
}
const AddMessageFormRedux=reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)