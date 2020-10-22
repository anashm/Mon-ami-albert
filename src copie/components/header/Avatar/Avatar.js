import React,{useState , memo} from 'react'
import './Avatar.css'
const Avatar =  (props)  => {

    const [ imageClicked , setImageClicked ] = useState('image-avatar');

    const clicked = (event) => {
        props.getAvatar(event)
        setImageClicked('avatar_clicked');
        props.avatarClicked(props.logo);
    }

    return (
        <div >
            <img onClick={ () => clicked(props.name) } className={props.active} src={props.logo} alt = 'avatar' />
        </div>
    )
    
}

export default Avatar
