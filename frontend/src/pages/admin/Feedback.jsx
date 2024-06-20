import React, { useState, useEffect } from 'react'
import { GoStarFill } from "react-icons/go"
import axios from 'axios'

const Feedback = () => {

    const [data,setData] = useState([]);


    const getFeedback = async() =>{
        try {

            let response = await axios.get('http://localhost:5000/feedbacks')
            
            if(response.status == 200){
                setData(response.data.feedbacks)
            }
            else{
                console.log(response.status.toString())
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getFeedback()
    }, [])

    
    


  return (
    <div className='flex justify-center'>
    <div className='h-[400px] w-full xl:w-[1700px] p-5 mb-10 items-center justify-center flex flex-col bg-slate-50 outline outline-2 outline-slate-100 rounded-md'>
        <div className='w-full'>
            <h1 className='font-semibold text-xl'>Feedback and rating</h1>
        </div>
        <div className='overflow-y-auto   w-full list mt-4 space-y-5'>

            {

         data.length > 0 ? data.map((value,index)=>{
                    return <div key={index} className=' container p-5 border shadow-md rounded-md bg-white'>
                    <div className=' flex items-center justify-between '>
                        <div className='flex items-center gap-2'>
                            <img className=' max-h-9 rounded-full bg-green-500 ' src='user.png'  />
                            <div>
                                <h2 className='font-semibold text-md'>{value.voter.name}</h2>
                                <p className=' font-medium text-slate-500 text-xs'>
                                {
                                        `${value.date.day}-${value.date.month}-${value.date.year}`
                                }</p>
                            </div>
                        </div>
    
                        <div className='rating flex gap-1 text-yellow-400'>
                           

                            {
                                value.rating == 5 ? <div className='flex gap-1'> <GoStarFill /> <GoStarFill /> <GoStarFill />  <GoStarFill />  <GoStarFill />  </div> : value.rating == 4 ?  <div className='flex gap-1'><GoStarFill /> <GoStarFill /> <GoStarFill />  <GoStarFill /> </div> : value.rating == 3 ? <div className='flex gap-1'><GoStarFill /> <GoStarFill /> <GoStarFill /> </div> : value.rating == 2 ? <div className='flex gap-1'><GoStarFill /> <GoStarFill /> </div> : value.rating == 1 ? <div><GoStarFill /> </div> : <div className='text-slate-500 text-sm italic'>Not Rated</div>
                            }
                        </div>
                        
                    </div>
                    <div className='content mt-5'>
                        <p className='text-sm text-slate-600 text-justify'>
                       {
                        value.content
                       }
                        </p>
                    </div>
                </div>
                })  : <h2 className='text-slate-500 italic'>Not available</h2>

            }

            
        </div>
    </div>
    </div>
  )
}

export default Feedback