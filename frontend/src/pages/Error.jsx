import React from 'react'
import NavBar from '../components/NavBar'
import errorImg from '/error.png'

const Error = () => {
  return (
    <div>
        <NavBar/>
        <div className='flex items-center h-[calc(100vh-100px)] justify-center'>
        
        <div className='content'>
            <div className=' w-[300px] 2xl:w-[450px]'>
               <img  src={errorImg}/> 
               <h1 className='text-2xl 2xl:text-4xl font-bold'>Oops! the page not found</h1> 
            </div>
        </div>
     
        </div>
    </div>
  )
}

export default Error