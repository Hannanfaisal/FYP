import React from 'react'

const Modal = ({onclick}) => {
  return (
    

    
    <div className=' border-2 bg-gray-100 rounded-md w-fit p-6 absolute top-0'>
        <div>
            <h1 className='font-medium'>Do you want to delete?</h1>
        </div>
        <div className='flex gap-3 justify-end mt-3'>
            <button className='bg-red-700 rounded-md p-2 font-semibold text-white'>CONFIRM</button>
            <button className='bg-gray-300 font-semibold rounded-md p-2 ' onClick={onclick} >CANCEL</button>
        </div>
    </div>
  
  )
}

export default Modal