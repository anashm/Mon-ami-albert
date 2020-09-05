import React , { useEffect , useState , Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';


function FooterModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className = 'footer-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { props.jsx }
        </Modal.Body>
      </Modal>
    );
  }


const FooterLink = ({ link , text , jsx }) => {

    const [ showModal , setShowModal ] = useState(false);

    return(
        <Fragment>
            <p className = 'footer-link'  onClick = { () => setShowModal(true)  } > 
                { text }
            </p>

            <FooterModal 
            title = { text }
            show={showModal}
            jsx = {jsx}
            onHide={() => setShowModal(false)} 
            />
        </Fragment>
    );

}

export default FooterLink;
