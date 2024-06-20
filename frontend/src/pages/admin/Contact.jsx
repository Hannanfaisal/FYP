
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Contact = () => {

  const [data,setData] = useState([]);

  const getContacts = async() =>{

    try {
      let response = await axios.get('http://localhost:5000/contacts')
      if(response.status == 200){
        setData(response.data.contacts)
      }
      else{
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getContacts()
  }, [])
  

  return (
    <div className='flex justify-center'>
    <div className='w-full xl:w-[1700px] mb-14 border-2 border-slate-100 rounded-md bg-slate-50 p-5'>
      <div>
        <h1 className=' font-semibold text-xl'>User Queries</h1>
      </div>

  <div className='overflow-y-auto h-[325px] mt-4'>
     {
      data.map((value)=>{
        
        return <div className=' mb-3 container rounded-md border p-2.5 shadow-md'>
        <div className='flex items-center gap-1'>
  
            <img className='h-9 bg-green-500 rounded-full' src='user.png'/>
            <div>
                <h1>  Unknown</h1>
                <p className='text-slate-500 text-xs font-medium italic'> {`${value.date.day}-${value.date.month}-${value.date.year}`}</p>
            </div>
          
        </div>
        <div className='mt-5'>
          <div className='flex gap-1 relative'>
             <h3 className='italic text-slate-600 font-medium'>Email:</h3>
            
             <a className='left-20 absolute underline text-blue-700 italic' href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ahannan2016@outlook.com" target="_blank">{value.email}</a>
          </div>
          <div className='flex gap-1 relative'>
             <h3 className=' italic text-slate-600 font-medium '>Subject:</h3>
             <h3 className='left-20 absolute'>{value.subject}</h3>
          </div>
          <div className='flex gap-1 relative'>
             <h3 className=' italic text-slate-600 font-medium'>Message:</h3>
             <h3 className='left-20 absolute'>{value.message}</h3>
          </div>
        </div>
      </div>
      })
     }
  
  </div>
      

    </div>
    </div>
  )
}

export default Contact