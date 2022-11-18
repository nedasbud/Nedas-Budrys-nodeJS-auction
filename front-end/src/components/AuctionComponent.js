import React from 'react'
import { Link } from 'react-router-dom'

const AuctionComponent = ({ item, id }) => {

  return (
    <div className='auctionItem'>
      <img src={item.img} alt="" />
      <h2>Title: {item.title}</h2>
      <h4>Seconds left: {item.time}</h4>
      <h4>Price: {item.price}</h4>
      <h4>Current bids: {item.bids.length}</h4>
      <Link to={'/auctions/' + id}>Place a bet</Link>
    </div>
  )
}

export default AuctionComponent
