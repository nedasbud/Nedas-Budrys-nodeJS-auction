import React, { useState } from 'react'
import LoginComponent from '../components/LoginComponent'
import RegisterComponent from '../components/RegisterComponent'

const LoginPage = ({ setLoggedIn, setCurrentUser }) => {

  const [logErr, setLogErr] = useState('')

  return (
    <div>
      {logErr !== '' && <h1 className='logBox' >{logErr}</h1>}
      <div className='loginPage'>
        <LoginComponent setLogErr={setLogErr} setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
        <RegisterComponent setLogErr={setLogErr} />
      </div>
    </div>
  )
}

export default LoginPage
