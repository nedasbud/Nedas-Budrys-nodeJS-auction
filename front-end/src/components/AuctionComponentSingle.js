import React from 'react'

const AuctionComponentSingle = ({ item }) => {

  return (
    <div className='auctionItemSingle'>
      <img src={item.img} alt="" />
      <h2>Title: {item.title}</h2>
    </div>
  )
}

export default AuctionComponentSingle
