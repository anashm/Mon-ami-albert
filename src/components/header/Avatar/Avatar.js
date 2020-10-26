import React,{useState , memo,useEffect} from 'react'
import './Avatar.css';
import DefaultAvatar from '../../../images/avatars/Boy-3.png';


const Avatar =  (props)  => {

    const [ imageClicked , setImageClicked ] = useState('image-avatar');

    useEffect(() => {
        props.avatarClicked(DefaultAvatar);
    }, [])

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
