import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuctionComponentSingle from '../components/AuctionComponentSingle'

const SingleItemPage = ({ currentUser, socket, auctionItems }) => {

  const { id } = useParams();
  const [comp, setComp] = useState(null)
  const [time, setTime] = useState(1)
  const [price, setPrice] = useState(-1)
  const [bets, setBets] = useState([])
  useEffect(() => {
    socket.emit('getOne', id)
  }, [socket, id])

  useEffect(() => {
    socket.on('getOne', data => {
      setComp(data)
      setTime(data.time)
    })
  })

  useEffect(() => {
    if (time !== 'auction has ended') {
      setTime(auctionItems[id].time - 1)
      setPrice(auctionItems[id].price)
      setBets(auctionItems[id].bids)
    }
    if (time === 0) {
      setTime('auction has ended')
    }
  }, [auctionItems, bets, id, time])

  const betRef = useRef()
  const placeBet = () => {
    if (Number(betRef.current.value) <= price) return console.log('Your bet must be more than the previous bet')
    socket.emit('placeBet', { bet: Number(betRef.current.value), id: id, user: currentUser })
  }

  return (
    <div className='singlePage'>
      {comp && <AuctionComponentSingle item={comp}></AuctionComponentSingle>}
      <div className='otherSide'>
        <h2>Time left: {time} </h2>
        <h2>Current Price: {price}</h2>
        <h2>Current Bids: {bets.length}</h2>
        {(time === 'auction has ended' && bets.length > 0) && <h2 className='winner'>Winner is: {bets[bets.length - 1].user}</h2>}
        <input ref={betRef} type="number" placeholder='bet ammount' />
        {time >= 5 ? <button onClick={placeBet} className='betBtn'>place a bet</button> : <h2>Bets are closed.</h2>}
        {bets && <div className='betsBox'> {bets.map((x, i) => <h4 className='bets' key={i}>{x.user} placed a {x.bet} bet. </h4>)} </div>}
      </div>
    </div>
  )
}

export default SingleItemPage
