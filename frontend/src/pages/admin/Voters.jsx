
import React, { useState } from 'react'
import axios  from 'axios'
import { useEffect } from 'react'

const Voters = () => {
    const [data, setData] = useState([])

    const getVoters =  async() =>{
        try {
            let response = await axios.get('http://localhost:5000/voters')

            if(response.status == 200){
                setData(response.data.voters)
                localStorage.setItem('total_voters',response.data.voters.length)
            }
            else{
                console.log(response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getVoters()
    })

  return (
    <div className='flex justify-center'>
        <div className='w-full lg:w-[1700px] bg-slate-50 border-2 border-slate-100 rounded-md p-5'>
            <h2 className='text-lg font-semibold font-mono'>Registered Voters</h2>

            <div className='mt-4'>
                <table className='table-auto w-full'>
                    <thead className='bg-green-700 h-10 shadow-md'>
                        <tr className='text-md text-white text-start'>
                            <th className='font-semibold'>No.</th>
                            <th className='font-semibold'>Name</th>
                            <th className='font-semibold'>CNIC</th>
                            <th className='font-semibold'>Email</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value,index)=>{
                                return <tr className=' border-b-2 text-center bg-slate-100'>
                                       <td className='p-2 font-semibold'>{index+1}</td>  
                                       <td>{value.name}</td>  
                                       <td>{value.cnic}</td>  

                                       <td> {value.email != null? value.email : <p className='italic text-slate-600'>Not available</p>}
                                       </td>  
                                       </tr>
                            })
                        }
                        
                        
                    </tbody>
                </table>
            </div>


        </div>
    </div>
  )
}

export default Voters