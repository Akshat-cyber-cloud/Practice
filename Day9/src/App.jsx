import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import RecipeDetaill from './pages/RecipeDetaill'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetaill />} />
      </Routes>
    </div>
  )
}

export default App