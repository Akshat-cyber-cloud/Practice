import React from 'react'
import Navbar from './Components/Navbar'

import {Routes, Route} from "react-router-dom";

import Home from './Components/Home'
import Profile from './Components/Profile'

import UserContext from './context/UserContext'

const App = () => {

  const user = {
    name: "Akshay",
    email: "akshay@gmail.com",
    age: 21,
    college: "LPU"
  };

  return (
    <UserContext.Provider value={user}>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/profile' element={<Profile />} />

      </Routes>
    </UserContext.Provider>
  );
}

export default App