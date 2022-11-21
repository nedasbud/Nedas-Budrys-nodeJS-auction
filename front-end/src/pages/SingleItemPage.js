import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuctionComponentSingle from '../components/AuctionComponentSingle'

const SingleItemPage = ({ currentUser, socket, auctionItems }) => {

  const { id } = useParams();
  const [comp, setComp] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    socket.emit('getOne', id)
  }, [socket, id])

  useEffect(() => {
    socket.on('getOne', data => {
      setComp(data)
    })
  })

  const betRef = useRef()
  const placeBet = () => {
    if (Number(betRef.current.value) <= auctionItems[id].price) return setErr('Your bet must be more than the current price')
    socket.emit('placeBet', { bet: Number(betRef.current.value), id: id, user: currentUser })
    setErr('')
  }

  return (
    <div className='singlePage'>
      {comp && <AuctionComponentSingle item={comp}></AuctionComponentSingle>}
      <div className='otherSide'>
        {err !== '' && <h2 style={{ color: 'orange' }}>{err}</h2>}
        <h2>Time left: {auctionItems[id].time} </h2>
        <h2>Current Price: {auctionItems[id].price}</h2>
        <h2>Current Bids: {auctionItems[id].bids.length}</h2>
        {(auctionItems[id].time === 'Auction has ended' && auctionItems[id].bids.length > 0) && <h2 className='winner'>Winner is: {auctionItems[id].bids[auctionItems[id].bids.length - 1].user}</h2>}
        <input ref={betRef} type="number" placeholder='bet ammount' />
        {auctionItems[id].time >= 5 ? <button onClick={placeBet} className='betBtn'>place a bet</button> : <h2>Bets are closed.</h2>}
        {auctionItems[id].bids && <div className='betsBox'> {auctionItems[id].bids.map((x, i) => <h4 className='bets' key={i}>{x.user} placed a {x.bet} bet. </h4>)} </div>}
      </div>
    </div>
  )
}

export default SingleItemPage
