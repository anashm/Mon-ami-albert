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
                    <svg className= {`ham hamRotate ham1 ${open ? 'active' : ''}`} viewBox="0 0 100 100" width="60" >
                        <path
                                class="line top"
                                d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                        <path
                                class="line middle"
                                d="m 30,50 h 40" />
                        <path
                                class="line bottom"
                                d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                        </svg>
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
    );
}

export default HamburgerMenu;
