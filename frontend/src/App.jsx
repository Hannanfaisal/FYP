import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import React from 'react'
import Admin from './pages/admin/Admin'
import Error from './pages/Error'
import Profile from './pages/admin/Profile'
import Login from './pages/admin/Login'
import Announcement from './pages/admin/Announcement'
import Feedback from './pages/admin/Feedback'
import Contact from './pages/admin/Contact'
import Candidates from './pages/admin/Candidates'
import Candidate from './pages/admin/Candidate'
import Dashboard from './pages/admin/Dashboard'
import Elections from './pages/admin/Elections'
import Parties from './pages/admin/Parties'
import Party from './pages/admin/Party'
import Protected from './components/Protected'
import Results from './pages/admin/Results'
import { useSelector } from 'react-redux'
import { Admins } from './pages/admin/Admins'
import Notifications from './pages/admin/Notifications'
import Voters from './pages/admin/Voters'
import Registeration from './pages/admin/Registeration'


const App = () => {

  const auth =  useSelector((state)=>state.user.auth)

  


  return (
    <BrowserRouter>
    
    <Routes>
      <Route path='/login' element={<Login/>}/>

      <Route path='/' element={ <Protected isAuth={auth}><Admin/> </Protected> } >
         <Route path='/' element={  <Protected isAuth={auth}><Dashboard/></Protected>}/>
        <Route path='dashboard' element={  <Protected isAuth={auth}><Dashboard/></Protected>}/>
        <Route path='parties' element={<Protected isAuth={auth}><Parties/></Protected>}/>  
        <Route path='party' element={<Protected isAuth={auth}><Party/></Protected>}/>  
        <Route path='profile' element={<Protected isAuth={auth}><Profile/> </Protected>}/>
        <Route path='candidates' element={ <Protected isAuth={auth}><Candidates/></Protected> }/>
         

        <Route path='elections' element={  <Protected isAuth={auth}><Elections/></Protected>}/>
        <Route path='candidate' element={ <Protected isAuth={auth}><Candidate/></Protected>}/>
        <Route path='announcements' element={ <Protected isAuth={auth}><Announcement/></Protected>}/>
        <Route path='feedback' element={<Protected isAuth={auth}><Feedback/></Protected>}/>
        <Route path='contact' element={ <Protected isAuth={auth}><Contact/></Protected> }/>
        <Route path='results' element={<Protected isAuth={auth}><Results/></Protected>} />
        <Route path='admins' element={<Protected isAuth={auth}><Admins/></Protected>}/>
        <Route path='notifications' element={<Protected isAuth={auth}><Notifications/></Protected>}/>
        <Route path='voters' element={<Protected isAuth={auth}> <Voters/> </Protected>}/>
      </Route> 
     
      <Route path='/*' element={<Error/>}/> 
      <Route path='/registration' element={ <Protected isAuth={auth}> <Registeration/></Protected> }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
