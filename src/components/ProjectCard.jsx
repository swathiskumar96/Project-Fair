import React, { useState }  from 'react'
import {Card, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';

function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card onClick={handleShow} className='shadow btn' style={{ width: '28rem' }}>
      <Card.Img variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt={displayData?.title}/>
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <img className='img-fluid' style={{width:'100%'}} src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt={displayData?.title}/>

            </div>
            <div className='col-lg-6'>
              <h3>{displayData?.title}</h3>
              <h6> <span className='fw-bolder'>Languages Used</span> :{displayData?.language}</h6>
              <p style={{textAlign:'justify'}}><span className='fw-bolder'>OverView : </span>{displayData?.overview}</p>

            </div>

          </div>
          <div className='float-start mt-2'>
            <a href={displayData?.github}target='_blank' className='btn btn-secondary'><i className="fa-brands fa-github"></i></a>
            <a href={displayData?.website} target='_blank' className='btn btn-secondary ms-2'><i className="fa-brands fa-link"></i></a>


          </div>


        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard