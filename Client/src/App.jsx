import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Bookmark from './Pages/Bookmark'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/bookmark' element={<Bookmark />} />
      <Route path='/' element={ <Home/>} />
    </Routes>
    </>
  )
}

export default App
