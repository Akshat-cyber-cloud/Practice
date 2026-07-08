import React from 'react'
import {Routes , Route} from "react-router-dom";
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetails />} />
      </Routes>
    </div>
  )
}

export default App