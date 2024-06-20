
import React from 'react'
import { useLocation } from 'react-router-dom'

const Party = () => {
  const location = useLocation()

  const {state: value} = location;
 
  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-[1700px]'>
        <div className='bg-slate-50 rounded-md p-5 border-2 border-slate-100 mb-12'>
            <div className='flex items-center gap-4'>
              <div className='w-[150px] bg-white p-5 rounded-full border-2  border-green-700'>
                <img src={value.identification}/>  
              </div>
              <div>
                 <h2 className='font-bold italic text-2xl'> {value.name}<small className='text-xs'>(Party)</small></h2>
              </div>
            </div>
            <div className='mt-5'>
              <div className='flex gap-16 mt-2 '>
                <p className='font-semibold text-slate-800'>Email: </p>   
                <a className='underline italic text-blue-700' href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${value.email}`} target="_blank">{value.email}</a>
              </div>
              <div className='flex gap-5 mt-2'>
                <p className='font-semibold text-slate-800'>Description: </p>   
               <p className=' text-justify'> {value.description} </p>
              </div>
              <div className='flex gap-5 mt-2'>
                <p className='font-semibold text-slate-800'>Candidates:</p>   
               <div className=' border-2 p-2 rounded-md text-justify flex gap-1 '> {value.candidates.map((value)=>{
                return <div className='bg-green-700 mt-2 py-1 px-2 text-center text-white rounded-md' >
                  {value.name}
                  
                  </div>
               })} </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Party