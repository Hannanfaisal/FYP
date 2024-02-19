import React, { useState } from 'react'

import { MdSpaceDashboard } from "react-icons/md";
import { GiHamburgerMenu } from 'react-icons/gi'
import {CgProfile } from 'react-icons/cg'
import { FaUserTie } from 'react-icons/fa'
import {MdOutlineAnnouncement} from 'react-icons/md'
import { FaUserCircle } from "react-icons/fa"
import { VscFeedback } from 'react-icons/vsc'
import { TfiAnnouncement } from "react-icons/tfi"
import { IoStatsChartSharp } from "react-icons/io5"
import { IoMdLogOut } from "react-icons/io"
import { HiSpeakerphone } from "react-icons/hi"
import { FaUsersRectangle } from "react-icons/fa6"
import { IoLogOut } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const SideBar = () => {


    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState(0);
    const [item, setItem] = useState({name:"Dashboard",icon:<GiHamburgerMenu/>});

    const toggleMenu = () =>{
        setToggle(!toggle);
    }

    const toggleActive = (index) =>{
        setActive(index)
    }


    const menuItem = [
        {
            name: "Dashboard",
            icon: <MdSpaceDashboard size={21}/>,
            path: 'dashboard'
        },
        {
            name: "Candidates",
            icon: <FaUserTie size={21}/>,
            path: 'candidates'
        },
        {
            name: "Political Parties",
            icon: <FaUsersRectangle size={21}/>,
            path: 'party'
        },
        {
            name: "Announcements",
            icon: <HiSpeakerphone size={21}/>,
            path: 'announcements'
        },
        {
            name: "Results",
            icon: <IoStatsChartSharp size={21}/>,
            path: 'results'
        },
        {
            name: "Feedback",
            icon: <VscFeedback  size={21} />,
            path: 'feedback'
        },
        {
            name: "My Profile",
            icon: <FaUserCircle  size={21}/>,
            path: 'profile'

        },
        {
            name: "Logout",
            icon: <IoLogOut size={21}/>,
            path: 'logout'
        }
    ];


  return (
    <div className=' xl:w-[270px] bg-slate-50  xl:h-[100vh]  '>
        <div className='header  px-[35px] py-[35px]  flex justify-between items-center'>

            <div className=' flex items-center gap-1'>
                <div className='w-[50px] '>
                    <img src='/logo.png' />
                </div>
                <div>
                    <h1 className='text-xl font-bold'>DIGIVOTE HUB</h1>
                </div>
            </div>
            
            <div className='xl:hidden rounded p-1 bg-green-700 text-white' onClick={toggleMenu}>
            <GiHamburgerMenu/>
            </div>
        </div>
         <div className={`menu px-[25px] ${toggle ? 'block' : 'hidden xl:block'} `} >
            
            {
                menuItem.map((item,index)=>{
                return (<>
                
                    <NavLink key={index} to={item.path} className={ `menu-item flex items-center text-md gap-2 mb-1 p-2 ${active == index ? `bg-green-700 text-white rounded `: 'hover:bg-slate-200 hover:rounded-md hover:cursor-pointer'} `  } onClick={()=>{setActive(index); setToggle(false); setItem({name:item.name,icon:item.icon})}} >
                        <div> 
                            {item.icon}
                        </div>
                        <div>
                            <h2 className=' font-medium text-md'>{item.name}</h2>
                            </div>
                        </NavLink>

                        { toggle && <hr className='xl:hidden'/> }
                
                </>
                    );
                })
            }


           
        </div>

        
            <div className={`fixed xl:top-0  right-0 w-full xl:w-[calc(100vw-270px)] p-5  ${toggle && 'sm:hidden xl:block'}`}>
             <div className='bg-slate-50  rounded-md p-5  h-[72px] border-gray-100 border-2 items-center justify-start flex'>
                <div className='flex items-center space-x-1 text-xl font-semibold '> {item.icon} <h1>{item.name}</h1></div>
             </div>
            </div>
            
        

        
        
      
    </div>
  )
}

export default SideBar