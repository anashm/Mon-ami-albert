import React , { useState } from 'react'
import { Icon } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import './Exercise.scss';

const Exercise = ( { title , content , downloadLink , index } ) => {

    const [ modalOpen , setModalOpen  ] = useState(false);

    const handleShowModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);



    return (
        <div className = 'exercise-container'>
            <div className="exercise-number"> <span> { index } </span> </div>

            <p className="exercise-text" onClick = {handleShowModal}> { content } </p>

            <div className="exercise-icons-container">
                <a href= {downloadLink} className = 'download-link'> <span><Icon name='file pdf'/></span></a>
                <button className = 'open-exercise' onClick = { handleShowModal }><span><Icon name='eye'/></span></button>
            </div>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalOpen}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> { content } </p>
                </Modal.Body>
            
            </Modal>
            
        </div>
    )
}

export default Exercise
