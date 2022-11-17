import React, { useRef } from 'react'

const RegisterComponent = () => {

  const uRef = useRef();
  const p1Ref = useRef();
  const p2Ref = useRef();

  const registerUser = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: uRef.current.value,
        password1: p1Ref.current.value,
        password2: p2Ref.current.value
      }),
      credentials: "include"
    }
    const res = await fetch('http://localhost:4000/register', options)
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className='register'>
      <input ref={uRef} type="text" placeholder='username' />
      <input ref={p1Ref} type="text" placeholder='password 1' />
      <input ref={p2Ref} type="text" placeholder='password 2' />
      <button onClick={registerUser}>Register</button>
    </div>
  )
}

export default RegisterComponent
