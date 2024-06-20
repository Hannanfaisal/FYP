// import React, { useState } from 'react'
// import { IoMdArrowDropdown } from "react-icons/io";
// import { MdDelete, MdTry } from "react-icons/md";
// import Modal from '../../components/Modal';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { IoIosAddCircle } from "react-icons/io";
// import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const Announcement = () => {

//     const [toggleAnnouncment, setToggleAnnouncement] = useState();
//     const [togglePostAnnouncment, setTogglePostAnnouncement] = useState();
//     const [announcementPosted, setAnnouncementPosted] = useState(false);

//     const [toggleModal, setToggleModal] = useState(false);
//     const [edit,setEdit] = useState(false)

//     const [content, setContent] = useState("")
//     const [title, setTitle] = useState("")
//     const [data, setData] = useState([])
//     const [selectedIndex,setSelectedIndex] = useState(0)


//     const setValue = (value,e) =>{
//         if(value == 'title'){
//             setTitle(e.target.value)
//         }
//         else if(value == 'content'){
//             setContent(e.target.value)
//         }
//     }
    
//     const notifySuccess = (message) =>{
//         toast.success(message)
//     }

//     const notifyError = (message) =>{
//         toast.error(message);
//     }



    
//     const postAnnouncement = async() =>{

//         try {

//             if(title == "" || content == ""){
//                 return;
//             }
            
//             let response = await axios.post('http://localhost:5000/post-announcements', {
//                'title': title,
//                'content': content,
//                'duration': '1 day'
//             });

//             if(response.status == 201){
//                 notifySuccess("Announcement Posted")
//                     setAnnouncementPosted(true);
//                     document.getElementById('title').value = ''
//         document.getElementById('content').value = ''
//         setContent("");
//         setTitle("")
               
//             }
//             else{
//                 notifyError("Something went wrong")
//             }

            


//             // let data={
                
//             //     'title': 'Title1',
//             //     'content': 'Content1',
//             //     'duration': '1 day'

//             // };

//             // fetch('http://localhost:5000/post-announcements',{
//             //     method: 'Post',
//             //     headers:{
//             //         'Accept': 'application/json',
//             //         'Content-Type': 'application/json'
//             //     },
//             //     body:JSON.stringify(data)
//             // }).then((result)=>{
//             //     console.log(result)
//             // })

//             console.log('Posted')
            
//         } catch (error) {
//             notifyError("Something went wrong")
//             console.log(error)
//         }

       
           
//         } 


//         const getPosts = async() =>{

//             try {
//                let response = await axios.get('http://localhost:5000/announcements')

//                if(response.status == 200){
//                 setData(response.data)
//                 localStorage.setItem('total_announcements', response.data.length)
//                }
//                else{
//                 console.log(response.status)
//                }
//             } catch (error) {
//                 console.log(error)
//             }


//         }

//         const deletePost = async(id) =>{
//             try {

                

//                 let response = await axios.delete(`http://localhost:5000/delete/${id}`);
//                 if(response.status == 200){
//                     console.log(response.status);
//                 }
//                 else{
//                     console.log(response.status);
//                 }
//             } catch (error) {
                
//             }
//         }

//         const handleContentChange = (index, newContent) => {
//             let updatedContents = [...content];
//             updatedContents[index] = newContent;
//             setContent(updatedContents);
//           };



//         useEffect(() => {
//           getPosts()

         
//         })

//         // useEffect(() => {
//         //     if (announcementPosted) {
//         //         setTitle('');
//         //         setContent('');
//         //         setAnnouncementPosted(false); 
//         //     }
//         // }, [announcementPosted]);

        
        

         


    


//   return (
//     <div className='flex justify-center'>
//     <div className=' overflow-y-auto h-[400px] relative w-full xl:w-[1700px]'>
//         <button className='bg-green-700 px-2 py-1.5 text-white rounded-md font-semibold' onClick={()=>setTogglePostAnnouncement(!togglePostAnnouncment)}><div className='flex items-center gap-1'> <IoIosAddCircle/>  POST ANNOUNCEMENT</div></button>
//     {togglePostAnnouncment &&
//         <div className='overflow-y-auto mt-5 h-[290px] bg-gray-50 border-2 border-gray-100 rounded-md p-5'>
//         <div className='grid grid-cols-1 lg:grid-cols-2 '>
//             <div>
//                 <h1 className='text-xl font-medium'>News & Announcement</h1>
//                 <p>Post important announcements and updates here.</p>
//             </div>
//             <div className='my-10 lg:my-0'>
//                 <input name='title' id='title' className='w-full mb-4 p-2 shadow-md border  outline-green-600 rounded-md focus:shadow-none  placeholder:text-gray-700' type='text' placeholder='Enter Title' onChange={(e)=>setValue(e.target.name,e)} />
//                 <textarea name='content' id='content' className='w-full p-2 shadow-md rounded-md border  outline-green-600 focus:shadow-none placeholder:text-gray-700' rows={5} placeholder='Enter Announcement' onChange={(e)=>setValue(e.target.name,e)} >
//                 </textarea>
//                 <div className=' flex gap-3 mt-3'>
//                     <button className='bg-green-700 text-white p-2 rounded-md font-semibold hover:bg-green-600' onClick={postAnnouncement}>POST</button>
//                     <button className='bg-gray-300 p-2 rounded-md font-semibold hover:bg-gray-200' onClick={()=>setTogglePostAnnouncement(false)}>CANCEL</button>
//                 </div>
//             </div>
//         </div>
//         </div>
//     }
  
//      <div className='overflow-y-auto h-[290px] mt-5'>
//     {

        
        
//             data.length > 0 && data.map((value, index) => { 
                

               
//                 return(
    
//                 <div key={index} className='card bg-slate-50 rounded-md border-2 outline-gray-100 mb-2 p-5'>
//                     <div className='flex justify-between'>
//                         <div>
//                             <h1 className='text-md font-semibold'>{index + 1}. {value.title}</h1>
//                         </div>
//                         <div className={`rounded-full hover:bg-gray-300 hover:cursor-pointer duration-300 ${toggleAnnouncment && (selectedIndex == index) && "rotate-180"}`}>
//                             <IoMdArrowDropdown size={30} onClick={() => { setSelectedIndex(index);  setToggleAnnouncement(!toggleAnnouncment)}} />
//                         </div>
//                     </div>
//                     {toggleAnnouncment && (selectedIndex == index) && (
//                         <div>
//                             {/* <p>{value.content}</p> */}
//                             {edit ?  <textarea name='content' id='content' className='w-1/2 p-2 shadow-md rounded-md border  outline-green-600 focus:shadow-none placeholder:text-gray-700' rows={2} value={value.content} onChange={(e)=>handleContentChange(index, e.target.value)} ></textarea> : <p>{value.content}</p>}
//                             <div className='flex my-3 justify-end gap-3'>
//                                 <button className='bg-green-700 p-2 rounded-md text-white font-semibold' onClick={ ()=>setEdit(true)}>
//                                     EDIT
//                                 </button>
                               
//                                 <button className='bg-red-600 text-white px-4 rounded-md' onClick={

// ()=>{
    
    
//     Swal.fire( { 
//       title: "Do you want to proceed?",
//       width: 430,
       
//       showCancelButton: true,
//       confirmButtonColor: '#15803D',
//       confirmButtonText: "PROCEED",
//       denyButtonText: `Don't save`
//     }).then((result) => {
      
//       if (result.isConfirmed) {

//         deletePost(value._id);
//         // Swal.fire("Saved!", "", "success");
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     }) }


//                                 }>
//                                     <MdDelete size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )})}
//         </div>
        
    
            
                   
        
            
            

        

      
//         {
//             toggleModal &&  <div className='flex justify-center'><Modal/></div> 
//         }        
       
//     </div>
        
//     <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />
//     </div>
//   )
// }

// export default Announcement


import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Modal from '../../components/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoIosAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Announcement = () => {
  const [toggleAnnouncement, setToggleAnnouncement] = useState(false);
  const [togglePostAnnouncement, setTogglePostAnnouncement] = useState(false);
  const [announcementPosted, setAnnouncementPosted] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const notifySuccess = (message) => {
    toast.success(message);
  }

  const notifyError = (message) => {
    toast.error(message);
  }

  const setValue = (value, e) => {
    if (value === 'title') {
      setTitle(e.target.value);
    } else if (value === 'content') {
      setContent(e.target.value);
    }
  }

  const postAnnouncement = async () => {
    try {
      if (title === "" || content === "") {
        return;
      }

      let response = await axios.post('http://localhost:5000/post-announcements', {
        'title': title,
        'content': content,
        'duration': '1 day'
      });

      if (response.status === 201) {
        notifySuccess("Announcement Posted");
        setAnnouncementPosted(true);
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        setContent("");
        setTitle("");
      } else {
        notifyError("Something went wrong");
      }
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  }

  const getPosts = async () => {
    try {
      let response = await axios.get('http://localhost:5000/announcements');
      if (response.status === 200) {
        setData(response.data);
        localStorage.setItem('total_announcements', response.data.length);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:5000/delete/${id}`);
      if (response.status === 200) {
        notifySuccess("Announcement Deleted");
        setData(data.filter(item => item._id !== id));
      } else {
        notifyError("Something went wrong");
      }
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  }

  const handleContentChange = (index, newContent) => {
    let updatedData = [...data];
    updatedData[index].content = newContent;
    setData(updatedData);
  }

  const handleSave = async (index, id) => {
    try {
      let response = await axios.put('http://localhost:5000/update-announcements', {
        'id': id ,
        'content': data[index].content
      });
      if (response.status === 200) {
        notifySuccess("Announcement Updated");
        setEditIndex(null);
      } else {
        notifyError("Something went wrong");
      }
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [announcementPosted]);

  return (
    <div className='flex justify-center'>
      <div className='overflow-y-auto h-[400px] relative w-full xl:w-[1700px]'>
        <button className='bg-green-700 px-2 py-1.5 text-white rounded-md font-semibold' onClick={() => setTogglePostAnnouncement(!togglePostAnnouncement)}>
          <div className='flex items-center gap-1'> <IoIosAddCircle /> POST ANNOUNCEMENT</div>
        </button>
        {togglePostAnnouncement &&
          <div className='overflow-y-auto mt-5 h-[290px] bg-gray-50 border-2 border-gray-100 rounded-md p-5'>
            <div className='grid grid-cols-1 lg:grid-cols-2 '>
              <div>
                <h1 className='text-xl font-medium'>News & Announcement</h1>
                <p>Post important announcements and updates here.</p>
              </div>
              <div className='my-10 lg:my-0'>
                <input name='title' id='title' className='w-full mb-4 p-2 shadow-md border outline-green-600 rounded-md focus:shadow-none placeholder:text-gray-700' type='text' placeholder='Enter Title' onChange={(e) => setValue(e.target.name, e)} />
                <textarea name='content' id='content' className='w-full p-2 shadow-md rounded-md border outline-green-600 focus:shadow-none placeholder:text-gray-700' rows={5} placeholder='Enter Announcement' onChange={(e) => setValue(e.target.name, e)} >
                </textarea>
                <div className='flex gap-3 mt-3'>
                  <button className='bg-green-700 text-white p-2 rounded-md font-semibold hover:bg-green-600' onClick={postAnnouncement}>POST</button>
                  <button className='bg-gray-300 p-2 rounded-md font-semibold hover:bg-gray-200' onClick={() => setTogglePostAnnouncement(false)}>CANCEL</button>
                </div>
              </div>
            </div>
          </div>
        }

        <div className='overflow-y-auto h-[290px] mt-5'>
          {data.length > 0 && data.map((value, index) => (
            <div key={index} className='card bg-slate-50 rounded-md border-2 outline-gray-100 mb-2 p-5'>
              <div className='flex justify-between'>
                <div>
                  <h1 className='text-md font-semibold'>{index + 1}. {value.title}</h1>
                </div>
                <div className={`rounded-full hover:bg-gray-300 hover:cursor-pointer duration-300 ${toggleAnnouncement && (selectedIndex === index) && "rotate-180"}`}>
                  <IoMdArrowDropdown size={30} onClick={() => { setSelectedIndex(index); setToggleAnnouncement(!toggleAnnouncement) }} />
                </div>
              </div>
              {toggleAnnouncement && (selectedIndex === index) && (
                <div>
                  {editIndex === index ? (
                    <textarea
                      name='content'
                      id='content'
                      className='w-1/2 p-2 shadow-md rounded-md border outline-green-600 focus:shadow-none placeholder:text-gray-700'
                      rows={2}
                      value={value.content}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                    ></textarea>
                  ) : (
                    <p>{value.content}</p>
                  )}
                  <div className='flex my-3 justify-end gap-3'>
                    {editIndex === index ? (
                      <button className='bg-green-700 p-2 rounded-md text-white font-semibold' onClick={() => handleSave(index, value._id)}>
                        SAVE
                      </button>
                    ) : (
                      <button className='bg-green-700 p-2 rounded-md text-white font-semibold' onClick={() => setEditIndex(index)}>
                        EDIT
                      </button>
                    )}
                    <button className='bg-red-600 text-white px-4 rounded-md' onClick={() => {
                      Swal.fire({
                        title: "Do you want to proceed?",
                        width: 430,
                        showCancelButton: true,
                        confirmButtonColor: '#15803D',
                        confirmButtonText: "PROCEED",
                        denyButtonText: `Don't save`
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deletePost(value._id);
                        } else if (result.isDenied) {
                          Swal.fire("Changes are not saved", "", "info");
                        }
                      })
                    }}>
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {toggleModal && <div className='flex justify-center'><Modal /></div>}
      </div>
      <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />
    </div>
  )
}

export default Announcement;
