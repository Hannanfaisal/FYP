import React from 'react'

const NavBar = () => {
  return (
    <nav className='p-4 bg-slate-100'>
        <div className='heading flex items-center gap-1'>
            <img className='w-[50px]' src='/logo.png'/>
            <h1 className='font-bold text-xl'>DIGIVOTE HUB</h1>
        </div>
    </nav>
  )
}

export default NavBar