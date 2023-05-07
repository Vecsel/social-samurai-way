import {ActionsTypes,} from "./redux-store";

let initialState = {
    dialogsData: [
        {id: 1, name: "Viktor"},
        {id: 2, name: "Dima"},
        {id: 3, name: "Alex"},
        {id: 4, name: "Sveta"},
    ] as Array<DialogsType>,
    messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hi, go home"},
        {id: 3, message: "Hi, Go cinema"},
        {id: 4, message: "Yo"},
    ] as Array<MessagesType>,

}
export type InitialStateDialogsType = typeof initialState

export const dialogsReducer = (state: InitialStateDialogsType = initialState, action: ActionsTypes): InitialStateDialogsType => {
    switch (action.type) {
        case "ADD-MESSAGE":
            let NewMessage = {
                id: 5, message: action.newMessageText
            }
            return {
                ...state,
                messagesData: [...state.messagesData, NewMessage],

            }

        default:
            return state
    }
}
export const addMessageActionCreator = (newMessageText:any) => {
    return {
        type: "ADD-MESSAGE", newMessageText
    } as const
}


//type

export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesPage = {
    messagesData: MessagesType[],
    dialogsData: DialogsType[]
    newMessageText: string
}