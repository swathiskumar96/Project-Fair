import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsAPI } from '../services/allAPI'


function Project() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])
  console.log(allProjects);
  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  const getAllProjects= async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Authorization": `Bearer ${token}`
    }
    try{
      const result = await getAllProjectsAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status==200){
        setAllProjects(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <Header/>
    <div style={{margintop:'150px'}} className="container-fluid mt-5">
      <div className="d-flex justify-content-between">
        <h1>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search project By Language Used'/>
      </div>
      <Row className='mt-5'>
        {
          allProjects?.length>0?
          allProjects?.map(project=>(
            <Col key={project} sm={12} md={6} lg={4}>
            <ProjectCard displayData={project}/>
            </Col>
    

          ))
          :
          <div className='fw-bolder text-danger m-5 text-center'>Project not found</div>
}
      </Row>
      
    </div>
    </>
      
  )
}

export default Project