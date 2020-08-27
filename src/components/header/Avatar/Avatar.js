import React,{useState} from 'react'
import './Avatar.css'
const Avatar = (props)  => {

    const [ imageClicked , setImageClicked ] = useState('image-avatar')
    const clicked = (event) => {
       
        //console.log(event)
        props.getAvatar(event)
        setImageClicked('avatar_clicked')
    }


    return (
        <div >
            <img onClick={event => clicked(props.name)} className={imageClicked} src={props.logo} />
        </div>
    )
    
}

export default Avatar
