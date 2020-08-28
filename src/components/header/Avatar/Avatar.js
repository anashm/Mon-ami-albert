import React,{useState} from 'react'
import './Avatar.css'
const Avatar = (props)  => {

    const [ imageClicked , setImageClicked ] = useState('image-avatar');

    const clicked = (event) => {
        console.log(props)
        props.getAvatar(event)
        setImageClicked('avatar_clicked');
        props.avatarClicked(props.logo);
    }


    return (
        <div >
            <img onClick={event => clicked(props.name)} className={props.active} src={props.logo} />
        </div>
    )
    
}

export default Avatar
