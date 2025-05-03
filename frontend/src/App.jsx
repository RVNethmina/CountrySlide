import React, { useContext } from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import CountryDetails from './pages/CountryDetails'
import { ToastContainer,toast } from 'react-toastify'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import { UserContext } from './context/UserContext'


const App = () => {

  const { uToken } = useContext(UserContext);

  return uToken ? (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer position='top-right' autoClose={2000} theme='dark' />
      <NavBar />
      <Routes>
        <Route path='/' element={<CountryDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  ) : (
    <>
      <div className="">
        <ToastContainer position='top-right' autoClose={2000} theme='dark' />
        <NavBar />
        <Routes>
          <Route path='/' element={<CountryDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
