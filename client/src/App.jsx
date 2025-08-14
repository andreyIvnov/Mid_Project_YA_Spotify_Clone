import { Routes, Route } from 'react-router-dom'

import WelcomePage from './WelcomePage'
import HomePage from './HomePage'

import './App.css'

function App() {

  return (
    <>
    {/* <HomePage /> */}
    <Routes>
      <Route path='' element={<WelcomePage />}/>
      <Route path='/callback' element={<WelcomePage />}/>
      <Route path='/home' element={<HomePage />}/>
      {/* <Route path='/' element={<HomePage />}/> */}
    </Routes>
      
    </>
  )
}

export default App
