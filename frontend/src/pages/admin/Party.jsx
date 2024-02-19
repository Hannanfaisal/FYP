
import React, { useState } from 'react'
import {GrAddCircle} from 'react-icons/gr'
import notFoundImage from '/notFound.png'

const Party = () => {

    const [toggle, setToggle] = useState(false)

    const Toggle = () =>{
        setToggle(true)
    }

  return (
    
        <div className='bg-gray-50 p-2 rounded-md  border-2 border-gray-100'> 
        <div className='flex items-center font-semibold text-lg  justify-center gap-1 cursor-pointer' onClick={Toggle} >
            <GrAddCircle/>
            <h2>Add Political Party</h2>
        </div>

        {toggle && 
        <div className='space-y-4 p-4 '>
            <form>
                <div className='grid xl:grid-cols-2 2xl:grid-cols-3 gap-5'>

                {/* name
email
identification-logo
candidate (ref: candidates)
slogan
password
description */}








            <div className='my-1 ' >
                <label htmlFor='name' className='font-medium'>
                        Name
                </label>
                <input className='name p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter name'/>
            </div>

            <div className='my-1 ' >
                <label htmlFor='name' className='font-medium'>
                        Email
                </label>
                <input className='email p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter email'/>
            </div>


            <div className='' >
                <label htmlFor='logo' className='font-medium'>
                        Description
                </label>

                <textarea className='block p-2 w-full rounded-md shadow-md border placeholder:text-gray-600 outline-gray-200 focus:shadow-none ' rows='2' placeholder='Enter description'/>

            </div>
                        
            <div className=' ' >
                <label htmlFor='password' className='font-medium'>
                        Password
                </label>
                <input className='password p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter password'/>
            </div>

            <div className='' >
                <label htmlFor='logo' className='font-medium'>
                       Identification Logo
                </label>
                <div className='flex items-center gap-2'>
                     <div className='logo rounded-full border-2 w-16 p-3 bg-white'>
                     <img src={notFoundImage}/>
                     </div>

                     <input type='file' className='block w-full  p-2 rounded-md bg-white outline-dashed outline-gray-200 outline-2 file:p-1.5 file:bg-slate-200 file:text-green-900 file:cursor-pointer file:rounded-md file:border-none'/>
                
                </div>
               

                
            </div>

                </div>

            </form> 
            <div className='gap-2 flex font-semibold'>
                <button   data-te-ripple-init
 className='bg-green-700 p-2  text-white rounded-md hover:bg-green-600'>REGISTER</button>
                <button className='bg-gray-300 p-2 rounded-md' onClick={()=>setToggle(false)}>Cancel</button>
            </div> 
            
        </div>
        }
        
        
        </div>

  )
}

export default Party