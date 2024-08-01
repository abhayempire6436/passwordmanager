import React from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'

const App = () => {
  return (
    // <div className='absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
    //   <Navbar />
    // </div>

    <div className='bg-[#89ccf3]'>
      <div className="bg-[#89ccf3] h-[100vh]">

      <Navbar />
      <Main />
      </div>
    </div>
  )
}

export default App
