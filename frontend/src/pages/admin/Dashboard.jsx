import React, { useEffect, useState } from 'react'
import { IoStatsChartSharp } from "react-icons/io5"
import { FaArrowCircleRight } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

import { RiUserSettingsLine } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { GiHamburgerMenu } from 'react-icons/gi'
import {CgProfile } from 'react-icons/cg'
import { MdOutlineHowToVote } from "react-icons/md";
import { FaUserTie } from 'react-icons/fa'
import {MdOutlineAnnouncement} from 'react-icons/md'
import { FaUserCircle } from "react-icons/fa"
import { VscFeedback } from 'react-icons/vsc'
import { TfiAnnouncement } from "react-icons/tfi"
import { FaUsers } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi"
import { FaUsersRectangle } from "react-icons/fa6"

import { MdOutlineContactSupport } from "react-icons/md";
import { NavLink } from 'react-router-dom';



const Dashboard = () => {



  const list = [
    {
      title: "No. of Candidates",
      icon: <FaUsers size={70} opacity={0.1}/>,
      path: '/candidates',
      count: localStorage.getItem('total_candidates')
    },

    {
      title: "Total Voters",
      icon: <ImUsers size={70} opacity={0.1}/>,
      path: '/voters',
      count: localStorage.getItem('total_voters')
    },

    {
      title: "No. of Political Parties",
      icon: <FaUsersRectangle size={70} opacity={0.1}/>,
      path: '/parties',
      count: localStorage.getItem('total_parties')
    },

    {
      title: "Total Elections",
      icon: <MdOutlineHowToVote size={70} opacity={0.1}/>,
      path: '/elections',
      count: localStorage.getItem('total_elections')
    },

    {
      title: "Total Announcements",
      icon: <TfiAnnouncement size={70} opacity={0.1}/>,
      path: '/announcements',
      count: localStorage.getItem('total_announcements')
    },

    {
      title: "Total Admins",
      icon: <RiUserSettingsLine size={70} opacity={0.1}/>,
      path: '/admins',
      count: localStorage.getItem('total_admins')
      
    },

    
    {
      title: "Total Results",
      icon: <IoStatsChartSharp size={70} opacity={0.1}/>,
      path: '/results',
      count: localStorage.getItem('total_results')
      
    },

   

  ]



  return (
    <div className='flex justify-center item-center'>
        <div className='w-full xl:w-[1700px] mb-12'>

            <div className='grid grid-flow-row  grid-cols-2 lg:grid-cols-3 gap-2 '>
             
             {
              list.map((value,index)=>{
                return <div key={index} className='mb-4 container h-[120px] bg-green-300 text-slate-800 rounded-md'>

                  <div className='flex justify-between p-3 items-center '>
                    <div>
                      <h1 className=' font-bold text-3xl'>{value.count}</h1>  
                      <p className='font-semibold'>{value.title}</p>
                    </div>

                    <div>
                      {value.icon}
                    </div>
                  </div>

                  <NavLink to={value.path} className='w-full h-[30px] bg-green-700 text-white flex justify-center hover:bg-green-900 items-center'><div className='flex items-center gap-1'><h3>More Info</h3><FaArrowCircleRight/></div></NavLink>
                </div>
              })
             }  
            </div>


           


            
        

            
        </div>
    </div>
  )
}

export default Dashboard