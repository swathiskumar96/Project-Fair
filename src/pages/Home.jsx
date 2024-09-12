import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import LandingImg from '../assets/homeimg1.png'
import ProjectCard from '../components/ProjectCard'
import { Button, Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'




function Home() {
  const [homeProjects, setHomeProjects] = useState([])
  const navigate = useNavigate()
  const [loginStatus, setLoginStatus] = useState(false)
  console.log(homeProjects);
  useEffect(() => {
    getHomeProjects()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  const handleProjects = () => {
    if (loginStatus) {
      navigate('/projects')
    } else {
      toast.warning("Please login to get full access to our projects")
    }
  }

  const getHomeProjects = async () => {
    try {
      const result = await getHomeProjectsAPI()
      console.log(result);
      if (result.status == 200) {
        setHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='w-100 d-flex justify-content-center align-items-center rounded'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: '60px' }}><i className="fa-solid fa-city me-3"></i><b>Project Fair</b></h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nobis nemo maiores maxime, dignissimos omnis minima at hic vitae, voluptatem dolorem delectus rerum repellendus reprehenderit cum. Quas, rerum? Est, eaque?</p>
              {
                loginStatus ?
                  <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Project<i className="fa-solid fa-long-right-arrow"></i></Link>
                  :
                  <Link to={'/login'} className='btn btn-warning'>Starts to Explore<i className="fa-solid fa-long-right-arrow"></i></Link>
              }
            </div>

            <div className='col-lg-6'>
              <img style={{ width: '100%' }} className='img-fluid' src={LandingImg} alt="" />




            </div>

          </div>

        </div>
      </div>

      <div className=''>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className='d-flex'>
            {
              homeProjects?.length > 0 &&
              homeProjects?.map(project => (
                <div key={project} className='me-5'>
                  <ProjectCard displayData={project} />
                </div>
              ))
            }
          </div>
        </marquee>
        <div className='text-center'>
          <button onClick={handleProjects} className='btn btn-link mt-3'>Click here to View More Projects</button>

        </div>
      </div>

      <div className='d-flex align-items-center mb-5 mt-5 flex-column'>
        <h1>Our Testimonials</h1>

        <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center' >
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="" />
                Max Miller
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>


                </div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, eveniet omnis illum atque ab molestias. Rem possimus eum illum voluptate. Quisquam quae iure perferendis minima
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center' >
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="" />
                Max Miller
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-regular fa-star "></i>

                </div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, eveniet omnis illum atque ab molestias. Rem possimus eum illum voluptate. Quisquam quae iure perferendis minima
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center' >
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="" />
                Max Miller
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-regular fa-star "></i>
                  <i class="fa-regular fa-star"></i>

                </div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, eveniet omnis illum atque ab molestias. Rem possimus eum illum voluptate. Quisquam quae iure perferendis minima
              </Card.Text>
            </Card.Body>
          </Card>




        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>

  )
}

export default Home