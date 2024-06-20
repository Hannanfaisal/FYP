
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoCloseCircle } from "react-icons/io5";

export const Admins = () => {

    const [data,setData] = useState([])
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [toggleStatus, setToggleStatus] = useState(false)
    const [dialog, setDialog] = useState(false)



    
    const notifyError = (status) =>{{}
        toast.error(status);
    }

    const notifySuccess = (status) =>{
        toast.success(status);
    }



    const setAdminStatus = async (id) =>{
        try {
           let response = await axios.put("http://localhost:5000/update-status", {
            'id': id,
            'status': toggleStatus
        })
           if(response.status == 200){
            notifySuccess("Status changed successfully")
           }
           else{
            console.log(response.status)
            notifyError(response.statusText)
           }
        } catch (error) {
            console.log(error)
            notifyError(error)
        }
    }

    const getAdmins = async () =>{

        try {



            let response = await axios.get("http://localhost:5000/admins")

            if(response.status == 200){
                
                setData(response.data)
                localStorage.setItem('total_admins', response.data.length)
            }
            else{
                console.log(response.status)
            }
            
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(()=>{
        getAdmins()
    })

  return (
    <div className='flex justify-center'>
        <div className='w-full lg:w-[1700px] bg-slate-50 p-5 border-2 border-slate-100 rounded-md' >
            <h1 className='font-semibold text-lg'>Admins</h1>
        <table className='w-full mt-3'>
                    <thead className='bg-green-700  h-10 shadow-md'>
                        <tr className='text-md text-white text-start'>
                            <th className=' font-semibold' >No.</th>
                            <th className=' font-semibold'>Name</th>
                            
                            <th className=' font-semibold'>Role</th>
                            <th className=' font-semibold'>Status</th>
                            <th className=' font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>

                        { data.length == 0 ? <p className='mt-4  font-semibold italic text-slate-500'>Records Not Avaliable</p> : data.map((value,index)=>{
                            return  <> <tr className='text-center bg-slate-100 border-b-2'>
                                        <td className='p-2 font-semibold'>
                                            {index+1}.                               
                                        </td>
                                        <td className='p-2'>
                                            {value.name}                           
                                        </td>
                                        <td>
                                              {value.role}                          
                                        </td>
                                        <td>
                                              {value.status ? 'Active': 'Inactive'}                          
                                        </td>
                                        <td className=' font-semibold'>
                                        <button className='px-2 py-0.5 me-1 bg-red-600 text-white rounded' onClick={
                                              ()=>{
                                                setSelectedAdmin(value)
                                                setDialog(true)
                                              }

                                                
                                            }>VIEW</button>
                                            <button className='bg-green-700 px-2 py-0.5 rounded text-white' onClick={()=>{
                                           
                                             setToggleStatus(!toggleStatus)
                                           
                                            setAdminStatus(value._id)
                                           
                                            
                                            
                                            
                                            }}>ACTIVE</button>       
                                        </td>
                                        
                                    </tr>
                                    
                               
                        
                
                        


                                    </>

                                    
                        })
                        
                        }
                        

                        
                            
                      
                        
                    </tbody>
                </table>
        </div>

        {    
                                    dialog && <div className='absolute w-1/2 2xl:w-1/5  rounded-md border bg-slate-200 p-5'>
                                <div className='flex justify-end'>
                                    <div className='hover:cursor-pointer hover:scale-150 hover:duration-150 text-red-600' onClick={()=>setDialog(false)}> <IoCloseCircle size={20}/> </div>
                                </div>
                
                                <div>
                            <h2 className='font-semibold text-xl'>Admin Details</h2>
                            <img className='h-[120px] w-[120px] bg-white rounded-full border-2 border-green-700 my-4 p-0.5 object-cover' src={selectedAdmin.photo}/>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Name: </h2>
                                <h2>{selectedAdmin.name}<small className='font-medium'>(admin)</small> </h2> 
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Email: </h2>
                                <a className='underline italic text-blue-700' href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${selectedAdmin.email}`} target="_blank">{selectedAdmin.email}</a>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Phone: </h2>
                                <h2>{selectedAdmin.phone}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Role </h2>
                                <h2>{selectedAdmin.role}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Status </h2>
                                <h2>{selectedAdmin.status}</h2>
                            </div>
                          
                         
                        </div>
                               
                
                            </div>
                            }
           <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center'/>
    </div>
  )
}
