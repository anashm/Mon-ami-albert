import React,{useState} from 'react'
import './Avatar.css'
const Avatar = (props)  => {

    const [ imageClicked , setImageClicked ] = useState('image-avatar');

    const clicked = (event) => {
        props.getAvatar(event)
        setImageClicked('avatar_clicked');
        props.avatarClicked(props.logo);
    }

    console.log('hello from avatar')


    return (
        <div >
            <img onClick={ () => clicked(props.name) } className={props.active} src={props.logo} alt = 'avatar' />
        </div>
    )
    
}

export default Avatar
