import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Toolbar = () => {


  return (
    <div className='toolbar'>
      <Link to={'/login'}>Go to login page</Link>
      <Link to={'/auctions'}>Go to auctions page</Link>
    </div>
  )
}

export default Toolbar
