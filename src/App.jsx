import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {  BrowserRouter as Router ,Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'
import Signup from './components/Signup/Signup'



const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  return (
    <Router>
      <div className='app'>
      
      
      <Navbar />
      <Routes>

      <Route path='/' element= {<Home/>} />
      <Route path='/coin/:coinId' element={<Coin/>} />
      <Route path='/signup' element={<Signup />}/>

      </Routes>
      <Footer/>
      </div>
      </Router>
  );
};

export default App
