import {
    addPostActionCreator, PostType
} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    post: PostType[],

}
type MapDispatchPropsType = {
    addPost: (newPostText:string) => void,

}

export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {

        post: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (NewPostText:string) => {
            dispatch(addPostActionCreator(NewPostText))
        }
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)