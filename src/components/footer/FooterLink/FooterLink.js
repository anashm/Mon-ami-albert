import React , { useEffect , useState , Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import img from '../Albert.png';


function FooterModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className = 'footer-modal'
      >
        <Modal.Header closeButton />
      
      
        <Modal.Body className = 'footer-modal-body'>
          <div className="footer-modal-header">
              <img src={img} alt=""/>
              <h2 class="main-sectiontitle overlined-center    text-center"> {props.title} </h2>
        </div>

          <div className="footer-modal-body-content">
          { props.jsx }
          </div>

        </Modal.Body>
      </Modal>
    );
  }


const FooterLink = ({ link , text , jsx , id , className }) => {

    const [ showModal , setShowModal ] = useState(false);

    return(
        <Fragment>
            <p className = {`footer-link ${className}`}  id = { id } onClick = { () => setShowModal(true)  } > 
                { text }
            </p>

            <FooterModal 
            id = {`${id}-modal`}
            title = { text }
            show={showModal}
            jsx = {jsx}
            onHide={() => setShowModal(false)} 
            />
        </Fragment>
    );

}

export default FooterLink;
