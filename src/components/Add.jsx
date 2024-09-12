import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal} from 'react-bootstrap'
import uploadImg from '../assets/uploadimg.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';



function Add() {
 const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [preview,setPreview] = useState("")
  const [imageFileStatus,setImageFileStatus]= useState()
  const [projectDetails,setProjectDetails]= useState({
title:"",language:"",overview:"",github:"",website:"",projectImage:""
  })
  console.log(projectDetails);
  const [show, setShow] = useState(false);

  const handleClose = () => {
  setShow(false);
  setProjectDetails({title:"",language:"",overview:"",github:"",website:"",projectImage:"" })
  }
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg" || projectDetails.projectImage.type=="image/png" ){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      setPreview(uploadImg)
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
  },[projectDetails.projectImage])

  const handleUploadProject= async()=>{
    const {title,language,overview,github,website,projectImage} = projectDetails
    if(!title || !language || !overview || !github || !website || !projectImage){
      toast.warning("Please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        //api call
        try{
        const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          setAddResponse(result)
          handleClose()
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
console.log(err);
      }

      }

    }
  }
  return (
<>
<button onClick={handleShow} className='btn'><i className='fa-solid fa-plus me-1'></i>Add New</button>
<Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>
              <label>
                <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                <img height={'200px'} className='img-fluid' src={preview}alt="" />

              </label>
              {!imageFileStatus&&
              <div className='text-danger my-2'>*Upload only following file types (jpg , jpeg , png) here!!</div>
              }
            </div>
            <div className='col-lg-8'>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />

              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Languages used in project' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />

              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Project GitHub Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>

              </div>
              <div className='mb-2'>
                <input type="text" className='form-control' placeholder='Project Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />

              </div>



            </div>

          </div>
          <div className=''>
                <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />

              </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUploadProject}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

</> 
 )
}

export default Add