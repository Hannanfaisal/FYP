import React from 'react'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import {Outlet} from 'react-router-dom'

const Admin = () => {
  return (
    <div>
        <div className=''>
           
           <div className='fixed w-full '> 
            <SideBar/>
           </div>
           
            

            <div className=''>
                
                <div className=' absolute top-[210px] xl:top-[90px] -z-10 xl:z-20  right-0  xl:w-[calc(100vw-270px)] w-full p-5'>
                    <Outlet /> 
                </div>
              

                <div className='fixed right-0 bottom-0   xl:w-[calc(100vw-270px)] w-full'>
                    <Footer /> 
                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Admin