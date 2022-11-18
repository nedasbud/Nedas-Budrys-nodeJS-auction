import React from 'react'
import { Link } from 'react-router-dom'

const Toolbar = ({ currentUser, loggedIn }) => {

  return (
    <div className='toolbar'>
      {loggedIn && <h3>Welcome: {currentUser}</h3>}
      <div className='toolbarLinks'>
        <Link to={'/login'}>Go to login page</Link>
        {loggedIn && <Link to={'/auctions'}>Go to auctions page</Link>}
      </div>
    </div>
  )
}

export default Toolbar
