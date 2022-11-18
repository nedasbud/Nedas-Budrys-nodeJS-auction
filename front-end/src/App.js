import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import AllAuctionsPage from './pages/AllAuctionsPage';
import { io } from 'socket.io-client';
import Toolbar from './components/Toolbar';
import { useEffect, useState } from 'react';
import AddItemPage from './pages/AddItemPage';
import SingleItemPage from './pages/SingleItemPage';


const socket = io.connect('http://localhost:4000')

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [auctionItems, setAuctionItems] = useState([])
  const [currentUser, setCurrentUser] = useState('Neprisijungta')


  async function checkIfLogged() {
    const res = await fetch('http://localhost:4000/auctions', { credentials: "include" })
    const data = await res.json();
    console.log(data);
    if (data.error) {
      console.log('neprisijunges? :)')
      setLoggedIn(false)
      return
    }
    setCurrentUser(data.data)
    setLoggedIn(true)
  }

  useEffect(() => {
    if (!loggedIn) checkIfLogged()
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      socket.on('getAuctions', data => {
        console.log('atnaujino data')
        setAuctionItems(data)
      })
    }
  }, [loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar currentUser={currentUser} loggedIn={loggedIn}></Toolbar>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path='/auctions' element={<AllAuctionsPage items={auctionItems} loggedIn={loggedIn} />} />
          <Route path='/auctions/add' element={<AddItemPage loggedIn={loggedIn} socket={socket} />} />
          <Route path='/auctions/:id' element={<SingleItemPage currentUser={currentUser} auctionItems={auctionItems} loggedIn={loggedIn} socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
