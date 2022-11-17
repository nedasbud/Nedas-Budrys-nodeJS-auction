import React, { useEffect } from 'react'
import AuctionComponent from '../components/AuctionComponent';

const AllAuctionsPage = ({ loggedIn, setLoggedIn, socket, items }) => {


  async function checkIfLogged() {
    const res = await fetch('http://localhost:4000/auctions')
    const data = await res.json();
    console.log(data);
    if (data.error) {
      console.log('nu klaidele')
      setLoggedIn(false)
      return
    }
    setLoggedIn(true)
  }

  useEffect(() => {
    if (!loggedIn) checkIfLogged()
    if (loggedIn) socket.emit('loggedIn')
  }, [socket])

  return (
    <div className='auction'>
      {!loggedIn && <h1 style={{ color: 'red' }}>You can only access this page while logged in</h1>}
      {loggedIn && items.map((x, i) => <AuctionComponent key={i} item={x}></AuctionComponent>)}
    </div>
  )
}

export default AllAuctionsPage
