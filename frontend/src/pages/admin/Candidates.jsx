
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {  useNavigate} from 'react-router-dom'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'

const Candidates = () => {

    const [data,setData] = useState([])
   const navigate = useNavigate()
    


    
    const  getCandidates = async()=>{

        try {

           let response = await axios.get('http://localhost:5000/candidates')

           if(response.status == 200){
            setData(response.data);
            localStorage.setItem('total_candidates',response.data.length)
           }
           else{
            console.log(response.status)
           }
        
        } catch (error) {
            console.log(error)
        }

    }

 
    useEffect(()=>{
        getCandidates()
      
    })



    

  return (
    <div className='flex justify-center '>
    <div className='  w-full xl:w-[1700px] border-2 border-slate-100  bg-slate-50 rounded-md p-5'>

        <h1 className=' font-semibold text-xl'>Registered Candidates</h1>

      


    <div className='overflow-y-auto h-[330px] mt-3'>
    {  
        data.map((value,index)=>{
            return  <div key={index} className='mb-3 bg-white container w-full shadow-md rounded-md p-3 border flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <img className='h-9 w-9 bg-green-600 rounded-full object-cover' src={`data:image/jpeg;base64,${value.photo}`}/>
                <h2 className='font-medium'>{value.name}</h2>
            </div>
            <div>
                <button className=' bg-green-700 px-1.5 py-0.5 rounded-md text-white' onClick={
                    
                    ()=>navigate("/candidate",{state: value})
                 
                    } >DETAILS</button>
                
                
            </div>
        </div>
        }) 
        
    }

    </div>
    </div>
    </div>
  )
}

export default Candidates