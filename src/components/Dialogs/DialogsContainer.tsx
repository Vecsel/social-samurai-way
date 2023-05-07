import {
    addMessageActionCreator, DialogsType, MessagesType
} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    dialogs: DialogsType[],
    messages: MessagesType[],


}
type MapDispatchPropsType = {
    addMessageAction: (newMessageText:any) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.messagesPage.dialogsData,
        messages: state.messagesPage.messagesData,


    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {

        addMessageAction: (newMessageText:any) => {
            dispatch(addMessageActionCreator(newMessageText))
        }
    }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer