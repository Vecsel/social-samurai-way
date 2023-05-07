import React from "react";
import cont from "./MyPost.module.css"
import {Post} from "../Post/Post";
import {ProfilePropsType} from "./MyPostContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


export const MyPost = React.memo((props: ProfilePropsType) => {
    console.log('render')
    let postElements = props.post.map(p => <Post key={p.id} messages={p.message} likesCount={p.likesCount}/>)

    const AddPost = (values: any) => {
        props.addPost(values.NewPostText)
    }
    return (
        <div className={cont.content}>

            <div>
                <h3>My posts</h3>
                <div>your news</div>
                <AddPostFormRedux onSubmit={AddPost}/>
                {postElements}
            </div>
        </div>
    )
})

const maxLength10=maxLengthCreator(10)

const AddPostForm:React.FC<InjectedFormProps<FormDataType>> =(props:any)=>{
    return(<form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name='NewPostText' validate={[requiredField, maxLength10]} placeholder={'Post message'}/>
        </div>
        <button>Send</button>
    </form>)
}

const AddPostFormRedux=reduxForm<FormDataType>({form:'profileAddPostForm'})(AddPostForm)

type FormDataType={
    NewPostText:string
}