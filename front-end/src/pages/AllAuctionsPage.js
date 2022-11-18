import React from 'react'
import { Link } from 'react-router-dom';
import AuctionComponent from '../components/AuctionComponent';

const AllAuctionsPage = ({ loggedIn, items }) => {

  return (
    <div className='auctionPage'>
      {loggedIn && <div><Link to={'/auctions/add'}>Add an item to the auction</Link></div>}
      <div className='auction'>
        {!loggedIn && <h1 style={{ color: 'red' }}>You can only access this page while logged in</h1>}
        {loggedIn && items.map((x, i) => <AuctionComponent key={i} id={i} item={x}></AuctionComponent>)}
      </div>
    </div>
  )
}

export default AllAuctionsPage
