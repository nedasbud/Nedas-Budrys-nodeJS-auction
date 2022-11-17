import React from 'react'
import LoginComponent from '../components/LoginComponent'
import RegisterComponent from '../components/RegisterComponent'

const LoginPage = ({ setLoggedIn }) => {
  return (
    <div className='loginPage'>
      <LoginComponent setLoggedIn={setLoggedIn} />
      <RegisterComponent />
    </div>
  )
}

export default LoginPage
