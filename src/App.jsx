import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from './components/ui/button'
import {Outlet,Navigate} from 'react-router-dom'
import Header from './components/custom/Header'

function App() {
  const [count, setCount] = useState(0)
  const {user,isloaded,isSignedIn}= useState();

  if (!isloaded) {
    return <div>Loading...</div>;
  }

  if(!isSignedIn)
  {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <>
     {/* <Header/>
     <Outlet/> */}
     <p>i am eugeniiiiiiiii</p>
    </>
  )
}

export default App
