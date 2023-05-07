import s from "./Paginator.module.css"
import React from "react";


export type UsersPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (p: number) => void,
}

export const Paginator = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount]

    if (props.currentPage < 4) {
        pages = [1, 2, 3, 4, pagesCount]
    }
    if (props.currentPage > pagesCount - 2) {
        pages = [1, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
    }
    return <div>
        <div>{pages.map(p => {
            return <span className={props.currentPage === p ? s.selectedPage : ""}
                         style={{padding: 10}}
                         onClick={() => {
                             props.onPageChanged(p)
                         }}>{p}</span>
        })}
        </div>
    </div>


}
