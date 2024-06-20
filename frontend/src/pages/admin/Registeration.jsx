

import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Registeration = () => {

    const [name,setName] = useState("")
    const [cnic, setCNIC] = useState("")
    const [gender, setGender ] = useState("")
    const [age,setAge] = useState("")
    const [city, setCity] = useState("")
    const [photo, setPhoto] = useState("")

    const [loader, setLoader] = useState(false)


    const notifySuccess = (message) =>{
        toast.success(message)
    }

    const notifyError = (message) =>{
        toast.error(message);
    }

   

    const uploadPhoto = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
    }



    const register = async () => {

        setLoader(true)
        try {
            if(!name || !cnic || !gender || !age || !city || !photo){
                notifyError("Enter all fields")
                setLoader(false)
                return;
            }

       

            let response = await axios.post("http://localhost:5000/register",{
                'name': name,
                'cnic': cnic,
                'photo': photo,
                'gender': gender,
                'age': age,
                'city': city
            })
            

            console.log(response.status)
            if(response.status == 201){
                notifySuccess("Registered")
                setLoader(false)

                document.getElementById('name').value = ''
                 document.getElementById('cnic').value = ''
                   document.getElementById('age').value = ''
                    document.getElementById('city').value = ''
                   document.getElementById('photo').value = ''
                    document.getElementById('gender').value = ''
            

                setName('')
                setCNIC('')
                setAge('')
                setCity('')
                setGender('')
                setPhoto('')
            }
         
            else{

                notifyError("Something went wrong")
                setLoader(false)
                console.log(response.status)
            }
        } catch (error) {
            if (error.response.status === 409) {
                notifyError("CNIC already registered");
                setLoader(false)
            } else {
                notifyError(error.message);
                setLoader(false)
            }
           
        }
    }

    console.log(gender)

  return (
    <div className='bg-green-700 h-[100vh] p-6  '>
        <div className='header flex  items-center gap-1'>
            <img width={50} src='logo.png'/>
            <h1 className='font-bold text-xl text-white'>DIGIVOTE HUB</h1>
        </div>

        <div className='w-full flex justify-center'>
            <div className='bg-slate-100 shadow-md shadow-green-900 w-1/2  mt-5 rounded-md p-5 flex flex-col justify-center items-center  '>
            <div className=''>
                <h2 className='text-xl font-bold'>REGISTRATION PORTAL</h2>
            </div>
            <div className='w-full mt-5 '>
                <div className='flex w-full gap-2'>

                <div className='mb-3 w-full'>
                    <input type='text' id='name' className='p-2 border rounded-md shadow-md w-full focus:outline-green-600 focus:shadow-none placeholder:text-slate-500' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/>   
                </div>
                <div className='mb-3 w-full'>
                    <input type='text' id='cnic' className='p-2 border rounded-md shadow-md w-full focus:outline-green-600 focus:shadow-none placeholder:text-slate-500' placeholder='Enter CNIC' value={cnic} onChange={(e)=>setCNIC(e.target.value)}/>   
                </div>
                </div>

                <div className='flex w-full gap-2'>
                
                <div className='mb-3 w-full'>
                    <input type='number' id='age' className='p-2 border rounded-md shadow-md w-full focus:outline-green-600 focus:shadow-none placeholder:text-slate-500' placeholder='Enter age' value={age} onChange={(e)=>setAge(e.target.value)}/>   
                </div>

                <div className='mb-3 w-full'>
                    <input type='text' id='city' className='p-2 border rounded-md shadow-md w-full focus:outline-green-600 focus:shadow-none placeholder:text-slate-500' placeholder='Enter city' value={city} onChange={(e)=>setCity(e.target.value)}/>   
                </div>

                </div>

                <div className='mb-3 w-full'>
                    <select id='gender' className='border shadow-md p-2 w-full rounded-md  focus:outline-green-600 focus:shadow-none' onChange={(e)=>setGender(e.target.value)}>
                        <option >Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>    
                    </select>   
                </div>

              

                <div className='mb-3 flex items-center gap-5'>
                    <div className='w-[100px] h-[100px]  bg-white border-2 p-1'>
                        <img className='h-full w-full object-scale-down' src={photo != '' ? photo : 'user.png'} />
                    </div>
                    <input type='file' id='photo' className='border-2 bg-white border-slate-300 border-dashed rounded-md p-2 file:rounded-md file:border-none file:bg-slate-200 file:p-1.5 file:text-green-700' accept="image/png, image/jpeg" onChange={uploadPhoto}/>
                </div>


                <div className='mb-3 flex justify-center w-full '>
                    <button className='bg-green-700 rounded-md text-white p-2 w-1/3 font-semibold hover:bg-green-600 text-center flex justify-center' onClick={  register }> {loader == true ? <div role="status">
    <svg aria-hidden="true" class="w-8.5 h-8.5 text-gray-300 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div> : ' REGISTER'}</button>
                </div>
                
            </div>
        </div> 
        </div>

        <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />
    </div>
  )
}

export default Registeration