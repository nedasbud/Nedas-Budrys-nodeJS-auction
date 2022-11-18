import React from 'react'
import LoginComponent from '../components/LoginComponent'
import RegisterComponent from '../components/RegisterComponent'

const LoginPage = ({ setLoggedIn, setCurrentUser }) => {
  return (
    <div className='loginPage'>
      <LoginComponent setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
      <RegisterComponent />
    </div>
  )
}

export default LoginPage
