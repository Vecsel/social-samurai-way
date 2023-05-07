import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    followThunk,
    getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unFollow,
    unFollowThunk,
    UsersType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {PreLoader} from "../common/preloader/PreLoader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersS
} from "../../redux/users-selectors";


type mapStatePropsType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setTotalUsersCount: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}
type mapDispatchPropsType = {
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setCurrentPage: (pageNumber: number) => void,
    toggleFollowingProgress: (userId: number, isFetching: boolean) => void
    getUsers: (currentPage: number, pageSize: number) => void
    unFollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
}

export type UsersPropsTypeC = mapStatePropsType & mapDispatchPropsType

class UsersAPIComponent extends React.Component<UsersPropsTypeC> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (p: number) => {
        this.props.getUsers(p, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <PreLoader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   unFollowThunk={this.props.unFollowThunk}
                   followThunk={this.props.followThunk}
            />
        </>
    }

}


/*const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        setTotalUsersCount: state.usersPage.totalUsersCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/
const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: getUsersS(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        setTotalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export const UsersContainer = connect(mapStateToProps, {
    follow, unFollow, setCurrentPage,
    toggleFollowingProgress, getUsers, unFollowThunk,
    followThunk
})(UsersAPIComponent)