import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddItemPage = ({ socket, loggedIn }) => {

  const imgRef = useRef()
  const titleRef = useRef()
  const timeRef = useRef()
  const priceRef = useRef()
  const nav = useNavigate()
  const [inp1Err, setInp1Err] = useState(false)
  const [inp2Err, setInp2Err] = useState(false)
  const [inp3Err, setInp3Err] = useState(false)
  const [inp4Err, setInp4Err] = useState(false)

  const verification = () => {
    setInp1Err(false)
    setInp2Err(false)
    setInp3Err(false)
    setInp4Err(false)
    if (imgRef.current.value.length < 3) setInp1Err(true)
    if (titleRef.current.value.length < 3) setInp2Err(true)
    if (Number(timeRef.current.value) < 1 || isNaN(Number(timeRef.current.value))) setInp3Err(true)
    if (Number(priceRef.current.value) < 1 || isNaN(Number(priceRef.current.value))) setInp4Err(true)
    if (inp1Err || inp2Err || inp3Err || inp4Err) return false
    return true
  }

  useEffect(() => { if (loggedIn) verification() })

  const uploadItem = () => {
    if (!verification()) return console.log('check inputs for errors')
    const data = {
      img: imgRef.current.value,
      title: titleRef.current.value,
      time: timeRef.current.value,
      price: priceRef.current.value
    }
    socket.emit('uploadItem', data)
    console.log('sekmingai issiusta')
    nav('/auctions')
  }

  return (
    <div className='addItemPage'>
      {(inp1Err || inp2Err || inp3Err || inp4Err) && <h3 style={{ color: 'orangered' }}>Correctly fill out the required fields to submit an item to the auction.</h3>}
      {
        loggedIn &&
        <div className='addItemForm'>
          <input ref={imgRef} type="text" placeholder='img_url' className={` ${inp1Err ? 'invalid' : ''} `} />
          <input ref={titleRef} type="text" placeholder='title' className={` ${inp2Err ? 'invalid' : ''} `} />
          <input ref={timeRef} type="text" placeholder='time in seconds' className={` ${inp3Err ? 'invalid' : ''} `} />
          <input ref={priceRef} type="text" placeholder='starting price' className={` ${inp4Err ? 'invalid' : ''} `} />
          <button onClick={uploadItem} > UPLOAD </button>
        </div>
      }
      {!loggedIn && <h1>You can only access this content while logged in</h1>}
    </div >
  )
}

export default AddItemPage
