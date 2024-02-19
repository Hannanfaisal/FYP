const Profile = () => {
    return (
      <div className='bg-slate-50 rounded-md border   2xl:px-[100px] 3xl:px-[300px] 4xl:px-[500px] 5xl:px-[800px] p-5'>
  
          <h1 className='font-bold text-xl mx-3'>Profile Information</h1>
  
          <form   className='mt-5'>
  
              <div className='flex items-center'>
             
              <div className=' bg-white outline-slate-950 border-2 mx-3 my-2 p-5 w-32 rounded-full'>
                  <img src='/user.png'/>
              </div>
  
              <input type='file' className='bg-white file:rounded file:p-2 file:text-green-800
               file:border-none file:cursor-pointer outline-slate-950 border-2 border-dashed p-2 rounded-md' />
  
              </div>
  
              <div className='grid lg:grid-cols-2 2xl:grid-cols-3 '>
  
              
              <div className=' my-2 mx-3'>
                  <label htmlFor='name' className='font-medium'>
                          Name
                  </label>
                  <input className='name p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter name'/>
              </div>
  
              <div className='my-2 mx-3' >
                  <label htmlFor='email' className='font-medium'>
                          Email
                  </label>
                  <input className='email p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter email'/>
              </div>
  
              <div className='my-2 mx-3'>
                  <label htmlFor='phone' className='font-medium'>
                          Phone
                  </label>
                  <input className='phone p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' type='text' placeholder='Enter phone'/>
              </div>
  
              <div className='my-2 mx-3'>
                  <label htmlFor='role' className='font-medium'>
                          Role
                  </label>
                  <input className='role p-2  border rounded-md block w-full  shadow-md focus:shadow-none  focus:outline-lime-600 placeholder:text-gray-600' disabled type='text' placeholder='Enter role'/>
              </div>
  
              
  
              </div>
              <div className='my-2 mx-3 space-x-2 '>
                  <button className='bg-green-700 p-2 rounded-md text-white focus:ring-2 ring-green-800 hover:bg-green-600 font-semibold'>SAVE CHANGES</button>
                  <button className='bg-gray-300 p-2 rounded-md focus:ring-2 ring-gray-300 hover:bg-gray-200 font-semibold'>RESET</button>
              </div>
  
          </form>
      </div>
    )
  }
  
  export default Profile