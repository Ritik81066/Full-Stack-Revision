import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Header />
   <Home />
   <Footer />
     <h1 className='bg-green-600 p-4'>React router</h1>
   </>
  )
}

export default App
