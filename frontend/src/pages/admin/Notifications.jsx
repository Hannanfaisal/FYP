import React, { useState, useEffect } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notifications = () => {

    const [data,setData] = useState([])
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [dialog,setDialog] = useState(false)

    let len;
    let count = 0;

    const notifyError = (status) =>{{}
        toast.error(status);
    }

    const notifySuccess = (status) =>{
        toast.success(status);
    }


    const formatDate = (date) =>{
        const parsedDate = new Date(date);
        
        return `${parsedDate.getMonth()+1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}`
    }


    const getCandidates = async () =>{

        try {



            let response = await axios.get("http://localhost:5000/candidates")

            if(response.status == 200){
                
                setData(response.data)
            }
            else{
                console.log(response.status)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const approveCandidate = async(id) =>{

        try {
            let response = await axios.put("http://localhost:5000/approval", {
                'id': id,
                'approval': true
            })
            
            if(response.status == 200){

                notifySuccess("Candidate approved")
            }
            else{
                console.log(response.status);
                notifyError(response.statusText)
            }
        } catch (error) {
            console.log(error)
            notifyError(error)
        }
    }

    useEffect(() => {
        getCandidates() 
    })


    



  return (
    <div className='flex justify-center h-[377px]'>
        <div className='w-full lg:w-[1700px] bg-slate-50 border-2 border-slate-100 p-5 rounded-md'>
            <div>
                <h1 className=' font-semibold text-xl'>Candidate Approval</h1>
            </div>
            <div className='mt-5 overflow-y-auto overflow-x-auto  w-full h-[300px]'>
                <table className='table-auto w-full'>
                    <thead className='bg-green-700  h-10 shadow-md'>
                        <tr className='text-md text-white text-start'>
                            <th className=' font-semibold' >No.</th>
                            <th className=' font-semibold'>Name</th>
                            
                            <th className=' font-semibold'>Date</th>
                            <th className=' font-semibold'>Status</th>
                            <th className=' font-semibold'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                        
                        
                        
                        data.map((value,index)=>{

                            len = value.approval == false
                            


                            return value.approval == false ? <> <tr className='text-center bg-slate-100 border-b-2'>
                                        <td className='p-2 font-semibold'>
                                            {index + 1}.                               
                                        </td>
                                        <td className='p-2'>
                                            {value.name}                               
                                        </td>
                                        <td>
                                            {formatDate(value.createdAt)}                             
                                        </td>
                                        <td className=' font-semibold'>
                                            {value.approval == true ? <p className=' text-green-700 '>Approved</p>: <p className='text-red-600 '>Not Approved</p> }                               
                                        </td>
                                        <td className=''>
                                            <button className='px-2 py-0.5 me-1 bg-red-600 text-white rounded' onClick={
                                                ()=>{

                                                    setSelectedCandidate(value)
                                                    
                                                    setDialog(true)
                                                }

                                                
                                            }>VIEW</button>
                                            <button className='bg-green-700 px-2 py-0.5 rounded text-white' onClick={()=>{
                                            
                                            if(value.approval == true){
                                                notifySuccess("Already Approved")
                                                return
                                            }

                                            
                                            approveCandidate(value._id)
                                            
                                            }}>APPROVE</button>                             
                                        </td>
                                    </tr>
                                    
                               
                        
                
                        


                                    </> : <></>

                                    
                        })
                        
                        }
                        {
                            len == 0 ? <p className='text-slate-600 mt-1'>No candidates for approval</p> : <></>
                        }

                        
                            
                      
                        
                    </tbody>
                </table>
            </div>
        </div>

        {    
                                    dialog && <div className='absolute w-1/2  rounded-md border bg-slate-200 p-5'>
                                <div className='flex justify-end'>
                                    <div className='hover: cursor-pointer' onClick={()=>setDialog(false)}>Close</div>
                                </div>
                
                                <div>
                            <h2 className='font-semibold text-xl'>Candidate Details</h2>
                            <img className='h-[120px] bg-white rounded-full border-2 border-green-700 my-4' src='user.png'/>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Name: </h2>
                                <h2>{selectedCandidate.name}<small className='font-medium'>(candidate)</small> </h2> 
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Email: </h2>
                                <a className='underline italic text-blue-700' href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${selectedCandidate.email}`} target="_blank">{selectedCandidate.email}</a>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Gender: </h2>
                                <h2>{selectedCandidate.gender}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Age: </h2>
                                <h2>{selectedCandidate.age}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Religion: </h2>
                                <h2>Islam</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Party: </h2>
                                <h2>{selectedCandidate.party.name}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Elected As: </h2>
                                <h2 className='italic'>{selectedCandidate.electedAs}</h2>
                            </div>
                        </div>
                               
                
                            </div>
                            }

       
        <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center'/>
    </div>


  )
}

export default Notifications