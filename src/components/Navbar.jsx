import React from 'react'
import logo from './logo.svg'

const Navbar = () => {
  return (
    <nav className='bg-[#003049] navbar flex justify-around items-center p-3'>
      <div className="logo font-bold text-center flex items-center text-xl text-[#519ac2] rounded-full">
        <a href="/">PassPhrase Chief</a>
      </div>

      <div className="links text-white">
        <ul className='flex gap-5'>
            <li className='hover:text-[#519ac2] cursor-pointer'>Home</li>
            <li className='hover:text-[#519ac2] cursor-pointer'>About</li>
            <li className='hover:text-[#519ac2] cursor-pointer'>Contact</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
