import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import AllAuctionsPage from './pages/AllAuctionsPage';
import { io } from 'socket.io-client';
import Toolbar from './components/Toolbar';
import { useEffect, useState } from 'react';


const socket = io.connect('http://localhost:4000')

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [auctionItems, setAuctionItems] = useState([])

  useEffect(() => {
    socket.on('getAuctions', data => {
      console.log('atnaujino data')
      setAuctionItems(data)
    })
  }, [])



  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar></Toolbar>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path='/auctions' element={<AllAuctionsPage items={auctionItems} socket={socket} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
