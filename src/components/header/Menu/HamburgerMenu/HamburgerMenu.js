import React , { Fragment , useState , useEffect , useRef } from 'react';

import { Icon } from 'semantic-ui-react';
import gsap from 'gsap';

const HamburgerMenu = () => {

    const [ close , setClose ] = useState(true);
    const [ open , setOpen ] = useState(false);

    let hamburger_menu_container = useRef(null);
    let mobile_menu = useRef(null);


    useEffect(() => {
        let tl = gsap.timeline();

        if(open){
            tl.to(hamburger_menu_container , {
                duration: 0.3,
                css: {
                    display: 'block',
                    opacity: 1
                },
            }).to(mobile_menu , {
                duration: 0.5,
                xPercent: 0
            } )
        }

        if(close){
            tl.to(mobile_menu , {
                duration: 0.6,
                xPercent: -100
            } ).to(hamburger_menu_container, {
                duration: 0.4,
                css: {
                    display: 'none',
                    opacity: 0
                },
            })
        }
        
    } , [close , open]);

    const handleDarkBackgroundClick = node => {
        if(node.id === ''){
            setClose(true);
            setOpen(false);
        }else{
            return
        }
    }


    return (
        <Fragment>
            <div className = "hamburger-menu-icon-container">
                <button onClick = { () => {setOpen(true) ; setClose(false)}} className = 'close-icon-btn hamburger-btn'>
                    <Icon name = 'content' />
                </button>

                <div className= 'hamburger-menu-container' ref = { el => (hamburger_menu_container = el) } onClick = { (e) => handleDarkBackgroundClick(e.target)} >
                    <nav className= 'mobile-menu' id = 'not-dark-background' ref = { el => (mobile_menu = el) }>
                        <ul className="nav-items-container">
                            <li className="nav-item">
                                <a href="#" className="nav-link">  </a>
                            </li>
                            <li className="nav-item">hello</li>
                            <li className="nav-item">hello</li>
                        </ul>

                        <button onClick = { () => { setClose(true) ; setOpen(false) } } className = 'hamburger-icon-btn hamburger-btn'>
                            <Icon name = 'close' />
                        </button>

                    </nav>
                </div>
            </div>
        </Fragment>
       
    )
}

export default HamburgerMenu
