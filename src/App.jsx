import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/TokenAuth'


function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth insideRegister/>}></Route>
        <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/projects' element={isAuthorised?<Projects/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/*' element={<Navigate to={'/'}/>}></Route>
    </Routes>
    <Footer/>

  
    </>
  )
}

export default App
