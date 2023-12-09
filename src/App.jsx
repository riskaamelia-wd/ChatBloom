import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Chat from './pages/Chat'
import UserPage from './pages/UserPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path={'/'} element={<UserPage/>}/>
      <Route path='chat/:id' element={<Chat/>}/>
    </Routes>    
  )
}

export default App
