import React, { useState } from 'react'
import { GoEye } from "react-icons/go"
import { GoEyeClosed } from "react-icons/go"
import { FaLock } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {useNavigate, Navigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slice/userSlice'

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [togglePassword,setTogglePassword] = useState(true)
    const [click, setClick] = useState(false);
    const dispatch = useDispatch()

    const navigate = useNavigate()



    const toggle = () =>{

        setTogglePassword(!togglePassword);

    }

    const notify = (message) =>{
        toast.error(message);
    }


    const login = async() =>{
        try {

            if(!email || ! password){
                setTimeout(notify('Enter email and password'),2000)
                return;
            }
            else if(!email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )){
                setTimeout(notify('Enter a valid email'),2000)
                return;
            }
            else if(password.length < 10){
                setTimeout(notify('Password should be more than 10 characters'),2000)
                return;
            }

            
            let response = await axios.post('http://localhost:5000/login-admin',{
                "email":email.trim(),
                "password": password.trim()
            })
    

            if(response.status == 200){ 

                const user = {
                    _id: response.data.admin._id,
                    email: response.data.admin.email,
                    username: response.data.admin.name,
                    auth: response.data.auth
                }
                
                console.log(response.data.admin.name)

                

                setTimeout(notify('Login Successful'),2000)
                dispatch(setUser(user))
                navigate("/dashboard")
                
            //
            console.log(response.status)
            }
            else{
                 setTimeout(notify('Login Unsuccessful'),2000)
                console.log(`Response ${response.status}`)
               
            }

            
        } catch (error) {
            setTimeout(notify('Login Unsuccessful'),2000)
            // console.log(`Response ${response.status}`)
            console.log(error)
        }
    }

  return (
    <>
    <div className='flex h-[100vh] bg-slate-50 '>
        <div className='left bg-green-700 lg:w-1/2 rounded-e-[100%]   p-8'>
            
            <div className='flex items-center gap-2'>
                <div className='w-[50px]'>
                    <img  src='logo.png'/>
                </div>
                <div>
                    <h1 className=' text-xl font-semibold text-white'>DIGIVOTE HUB</h1>
                </div>
            </div>

            <div className='h-[calc(100vh-30%)] flex justify-center items-center'>
                <img className='w-[400px] 2xl:w-[800px] opacity-5' src='vote.png'/>
            </div>

            

        </div>

        <div className='right flex justify-center items-center lg:w-1/2 mt-10  xl:mt-0'>
            <div className='form bg-white p-[40px] w-[60%] flex justify-center rounded-md shadow-lg'>
                <div className='w-full space-y-5' >

                    <div className='flex justify-center'>
                          <FaCircleUser color='green' size={60}/>
                    </div>
                  
                    <h1 className='font-semibold text-center text-xl'>LOGIN ACCOUNT</h1>
                    
                    <div className='relative'>
                        <div className='absolute left-2 top-1/3'>
                            <MdEmail color='green'/>
                        </div>
                         <input className='py-2 ps-9 pe-9 w-full rounded-md shadow-md outline outline-1 outline-slate-200 placeholder:text-gray-600 focus:outline-2 focus:outline-green-600 focus:shadow-none' type='text' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                   
                    <div className='relative'>
                        <div className='absolute left-2 bottom-1/3'>
                            <FaLock color='green'/>
                        </div>
                    <input className='py-2 ps-9 pe-9 w-full rounded-md shadow-md outline outline-1 outline-slate-200 placeholder:text-gray-600 focus:outline-2 focus:outline-green-600 focus:shadow-none' type= { togglePassword ? 'password' : 'text' } placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
                    <div className='absolute right-2 bottom-1/3' onClick={toggle}>
                       { togglePassword ? <GoEye color='green'/> : <GoEyeClosed color='green'/> }
                    </div>
                    </div>
                    <button className='bg-green-700 text-white p-2 w-full rounded-md font-semibold shadow hover:bg-green-600' disabled={false} onClick={ 
                        
                    //   ()=>{
                    //     login;
                    //     ()=>navigate('/dashboard')
                    //   }  
                       login

                    
                        
                        }>LOGIN</button>
                </div>
       
            </div>
    
        </div>
       
    </div>

    <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />
    </>
   
    
  )
}
//  ()=>setTimeout(notify,1000) 
export default Login