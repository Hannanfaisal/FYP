

import React from 'react'
import {useLocation} from 'react-router-dom'

const Candidate = () => {

    const location = useLocation();
    const { state: value } = location;

   
  return (
    <div className='flex justify-center'>
    <div className='w-full lg:w-[1700px] bg-slate-50 border-2 border-slate-100 rounded-md p-5'>
        <div>
            <h2 className='font-semibold text-xl'>Candidate Details</h2>
            <img className='h-[120px] w-[120px] bg-white rounded-full border-2 border-green-700 my-4' src={ value.photo != '' ? `data:image/jpeg;base64,${value.photo}` : 'user.png'}/>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Name: </h2>
                <h2>{value.name}<small className='font-medium'>(candidate)</small> </h2> 
            </div>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Email: </h2>
                <a className='underline italic text-blue-700' href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ahannan2016@outlook.com" target="_blank">{value.email}</a>
            </div>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Gender: </h2>
                <h2>{value.gender}</h2>
            </div>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Age: </h2>
                <h2>{value.age}</h2>
            </div>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Religion: </h2>
                <h2>Islam</h2>
            </div>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Party: </h2>
                <h2>{value.party?.name}</h2>
            </div>
            <div className='flex gap-1'>
                <h2 className='font-semibold text-slate-700'>Elected As: </h2>
                <h2>{value.electedAs}</h2>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Candidate