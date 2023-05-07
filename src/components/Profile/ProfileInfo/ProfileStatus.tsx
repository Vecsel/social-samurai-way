import React, {ChangeEvent} from 'react';
import cont from "./ProfileInfo.module.css";
import {ProfiledType} from "../../../redux/profile-reducer";

type ProfileInfoType = {
    profile?: ProfiledType | null
    status: string
    updateProfileStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileInfoType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateProfileStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Readonly<ProfileInfoType>, prevState: Readonly<{}>) {
        if (prevProps.status!==this.props.status){
            this.setState({
                status:this.props.status
            })
        }

    }

    render() {
        return (
            <>
                <div className={cont.infoBlock}>
                    <img src={this.props.profile?.photos.large}/>
                    <span style={{margin: 5}}>{this.props.profile?.fullName}</span>
                    <span style={{margin: 5}}>{this.props.profile?.lookingForAJob}</span>
                    <span style={{margin: 5}}>{this.props.profile?.lookingForAJobDescription}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.facebook}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.website}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.vk}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.twitter}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.instagram}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.youtube}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.github}</span>
                    <span style={{margin: 5}}>{this.props.profile?.contacts.mainLink}</span>
                </div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "---"}</span>
                    </div>
                    : <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </>)
    }

}

