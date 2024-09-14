import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

function Home() {
  return (
    <div>
      <Header/>
      <UserButton/>
      landing screen
    </div>
  )
}

export default Home