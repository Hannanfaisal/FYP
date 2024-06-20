import { useEffect, useState } from "react"
import axios from "axios"
import {useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Profile = () => {

    const [data,setData] = useState({})
    const [photo,setPhoto] = useState("")
    const [name,setName] = useState("")
    const [phone, setPhone] = useState("") 


    const params = useParams()
    const id = params.id

    const notifySuccess = (message) =>{
        toast.success(message)
    }

    const  notifyError = (message) =>{
        toast.error(message)
    }


    const uploadPhoto = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
    }

    const getAdminById = async(_id) => {

        try {

            let response = await axios.get(`http://localhost:5000/admin/${_id}`)

            if(response.status == 200){
                setData(response.data.admin)
                setName(response.data.admin.name)
                setPhone(response.data.admin.phone)

                console.log(data)
            }
            else{
                console.log(response.status)
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    const updateProfile = async ()=>{

        try {

           const id =  localStorage.getItem("_id");
           let response = await axios.put("http://localhost:5000/admin-update", {
                'id': id,
                'name': name,
                'phone': phone,
                'photo': photo
            })

            if(response.status == 200){
                console.log(response.status)
                notifySuccess("Profile updated")  
            }
            else{
                console.log(response.status)
                notifyError("Something went wrong") 
            }
            
        } catch (error) {
            console.log(error)
            notifyError("Something went wrong")
        }
    }

    const reset = () =>{
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
    }

    useEffect(()=>{
        const id = localStorage.getItem('_id')
        getAdminById(id)
       
    },[])

    return (
        <div className="flex justify-center">
      <div className=' w-full xl:w-[1700px] bg-slate-50 rounded-md border  2xl:px-[100px] 3xl:px-[300px] 4xl:px-[500px] 5xl:px-[800px] p-5'>
  
          <h1 className='font-bold text-xl mx-3'>Profile Information</h1>
  
          <div  className='mt-5'>
  
              <div className='flex items-center'>
             
              <img className=" h-[120px] w-[120px] bg-white border-2 border-green-600 rounded-full mx-3 object-cover" src={photo != "" ? photo : data['photo']}/>
  
              <input type='file' className='bg-white file:rounded file:p-2 file:text-green-800
               file:border-none file:cursor-pointer outline-slate-950 border-2 border-dashed p-2 rounded-md'  accept="image/*" onChange={uploadPhoto}/>
  
              </div>
  
              <div className='grid lg:grid-cols-2 2xl:grid-cols-3 '>
  
              
              <div className=' my-2 mx-3'>
                  <label htmlFor='name' className='font-medium'>
                          Name
                  </label>
                  <input className='name p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' name="name" placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
  
              <div className='my-2 mx-3' >
                  <label htmlFor='email' className='font-medium'>
                          Email
                  </label>
                  <input className='email p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter email' disabled value={data['email']}/>
              </div>
  
              <div className='my-2 mx-3'>
                  <label htmlFor='phone' className='font-medium'>
                          Phone
                  </label>
                  <input className='phone p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />
              </div>
  
              <div className='my-2 mx-3'>
                  <label htmlFor='role' className='font-medium'>
                          Role
                  </label>
                  <input className='role p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' disabled type='text' placeholder='Enter role' value={data['role']}/>
              </div>
  
              
  
              </div>
              <div className='my-2 mx-3 space-x-2 '>
                  <button className='bg-green-700 p-2 rounded-md text-white focus:ring-2 ring-green-800 hover:bg-green-600 font-semibold' onClick={updateProfile}>SAVE CHANGES</button>
                  <button className='bg-gray-300 p-2 rounded-md focus:ring-2 ring-gray-300 hover:bg-gray-200 font-semibold' onClick={reset}>RESET</button>
              </div>
  
          </div>
      </div>
      <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />

      </div>
    )
  }
  
  export default Profile