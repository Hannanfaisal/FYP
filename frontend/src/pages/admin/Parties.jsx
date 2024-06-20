
import React, { useState } from 'react'
import {GrAddCircle} from 'react-icons/gr'
import notFoundImage from '/notFound.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import Swal from 'sweetalert2'
  

const Parties = () => {

    const [toggle, setToggle] = useState(false)
    const [data,setData] = useState([])

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [photo, setPhoto] = useState("")
    const [description,setDescription] = useState("")

    const navigate = useNavigate()



    const Toggle = () =>{
        setToggle(true)
    }

   
    const uploadPhoto = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
    }

    const notifyError = (status) =>{
        toast.error(status);
    }

    const notifySuccess = (status) =>{
        toast.success(status);
    }


    const registerPoliticalParty = async() =>{
        
        try {

            if(!name || !email || !password || !description || !photo){
                setTimeout(notifyError('Enter all fields'),2000)
                return;
            }

            
          let response = await axios.post('http://localhost:5000/register-party',
            {
                'name': name,
                'email':email,
                'identification':photo,
                'password':password,
                'description': description
            
            }
            )

            if(response.status == 201){
                 
                
                console.log("registered")
                notifySuccess('Registered!')

            }else if(response.status == 409){
                notifyError(`${response.statusText}`)
            }
            else{
                console.log(`Response ${response.status}`)
                notifyError(`${response.statusText}`)
            }
            

        } catch (error) {
            console.log(error.message)
            notifyError('Something went wrong')
        }
    }

    const getParties = async()=>{

        try {

           let response = await axios.get('http://localhost:5000/parties')
           
           if(response.status == 200){
            
            setData(response.data)
            localStorage.setItem('total_parties', response.data.length)
           }
           else{
            console.log(response.status)
           }
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        getParties()
    })


   

  return (
    <div className=' flex justify-center'>
        <div className='overflow-y-auto h-[410px] mb-12 w-full xl:w-[1700px]'>
        <div className='bg-gray-50 p-2 rounded-md  border-2 border-gray-100'> 
        <div className='flex items-center font-semibold text-lg  justify-center gap-1 cursor-pointer' onClick={Toggle} >
            <GrAddCircle/>
            <h2>Add Political Party</h2>
        </div>

        {toggle && 
        <div className=' overflow-y-auto h-[300px]  space-y-4 p-4 '>
            <form>
                <div className='grid xl:grid-cols-2 2xl:grid-cols-3 gap-5'>









            <div className='my-1 ' >
                <label htmlFor='name' className='font-medium'>
                        Name
                </label>
                <input className='name p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-green-600 placeholder:text-gray-600' type='text' placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className='my-1 ' >
                <label htmlFor='name' className='font-medium'>
                        Email
                </label>
                <input className='email p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-green-600 placeholder:text-gray-600' type='text' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>


            <div className='' >
                <label htmlFor='logo' className='font-medium'>
                        Description
                </label>

                <input className='block p-2 w-full rounded-md shadow-md border placeholder:text-gray-600 outline-gray-200 focus:shadow-none ' rows='2' placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)} />

            </div>
                        
            <div className=' ' >
                <label htmlFor='password' className='font-medium'>
                        Password
                </label>
                <input className='password p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-green-600 placeholder:text-gray-600' type='text' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className='' >
                <label htmlFor='logo' className='font-medium'>
                       Identification Logo
                </label>
                <div className='flex items-center gap-2'>
                  
                     <img  className={`w-[70px] h-[60px] logo rounded-full border-2  p-0.5 object-cover ${photo == ''? 'border-slate-100' : 'border-green-600' } bg-white`} src={photo == '' ? notFoundImage : photo}/>
                     

                     <input type='file' className='block w-full  p-2 rounded-md bg-white outline-dashed outline-gray-200 outline-2 file:p-1.5 file:bg-slate-200 file:text-green-900 file:cursor-pointer file:rounded-md file:border-none' accept='image/*' onChange={uploadPhoto}/>
                
                </div>
               

                
            </div>

                </div>

            </form> 
            <div className='gap-2 flex font-semibold'>
                <button   data-te-ripple-init
 className='bg-green-700 p-2  text-white rounded-md hover:bg-green-600' onClick={
    
    registerPoliticalParty
//     ()=>{
//         Swal.fire( { 
//     title: "Do you want to register party?",
//     width: 430,
     
//     showCancelButton: true,
//     confirmButtonColor: '#15803D',
//     confirmButtonText: "REGISTER",
//     denyButtonText: `Don't save`
//   }).then((result) => {

//     registerPoliticalParty
    
//     if (result.isConfirmed) {
//       Swal.fire("Registered!", "", "success");
//     } else if (result.isDenied) {
//       Swal.fire("Changes are not saved", "", "info");
//     }
//   });
  
//   }
  
  } >REGISTER</button>
                <button className='bg-gray-300 p-2 rounded-md' onClick={()=>setToggle(false)}>Cancel</button>
            </div> 
            
        </div>
        }
        
        
        </div>

        <div className='bg-slate-50 mt-5 border-2 border-slate-100 p-5 rounded-md'>
            
            <h2 className='font-semibold text-xl'>Registered Parties</h2>

            <div className=' overflow-y-auto h-[250px]  grid  grid-cols-3 grid-flow-row gap-2 mt-3'>

                {
                 data.length > 0 ?  data.map((value, index)=>{
                        
                        return <div key={index} className='container h-[110px] bg-green-300 text-slate-800 rounded-md'>

                        <div className='flex justify-between p-3 items-center '>
                          <div>
                            <p className='font-bold text-xl'>{value.name}</p>
                          </div>
      
                          <div className='w-[55px] bg-slate-100 p-1 rounded-md'>
                            <img src={value.identification}/>
                          </div>
                        </div>
                        <div className='w-full h-[30px] bg-green-700 text-white flex justify-center hover:bg-green-900 items-center hover:cursor-pointer' onClick={()=>navigate('/party', {state: value})}>
                        <div className='flex items-center gap-1'><h3>DETAILS</h3></div>
                        </div>
            
                      </div>

                             
                    }) : <h2 className='text-slate-500 italic'>Not available</h2>
                }

             
           
            </div>
            

        </div>
        <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center'/>
        </div>
        </div>
  )
}

export default Parties