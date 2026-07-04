import React from 'react'
import { useState } from 'react'
import GitHub from './Components/GitHub';

const App = () => {
  const [count , setCount] = useState(0);

  return (
    <div>
      <GitHub />
    </div>
  )
}

export default App