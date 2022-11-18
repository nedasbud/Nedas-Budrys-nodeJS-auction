import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginComponent = ({ setLoggedIn, setCurrentUser }) => {

  const uRef = useRef()
  const pRef = useRef()
  const nav = useNavigate()

  const sendData = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: uRef.current.value,
        password: pRef.current.value
      }),
      credentials: "include"
    }
    const res = await fetch('http://localhost:4000/login', options)
    const data = await res.json();
    console.log(data);
    if (!data.error) {
      setCurrentUser(data.data.username)
      setLoggedIn(true)
      nav('/auctions')
    }
  }

  return (
    <div className='login'>
      <input ref={uRef} type="text" placeholder='username' />
      <input ref={pRef} type="text" placeholder='password' />
      <button onClick={sendData}>LOGIN</button>
    </div>
  )
}
export default LoginComponent
