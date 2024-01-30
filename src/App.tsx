import { useState } from 'react'
import './App.css'
import Appbar from './Appbar'
import SignUp from './SignUp'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignIn from './SignIn'
import AddCourse from './AddCourse'
import Courses from './Courses';
import { useSetRecoilState } from 'recoil';
import {userState} from './store/atom/coursesAtom';
import axios from "axios";
import Course from './Course';


function App() {
    
  const setUserMail=useSetRecoilState(userState); 
  const init=async()=>{
    const response=await axios.get('http://localhost:3000/admin/me',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('token')
      }
    });

       if(response.data.username){
        setUserMail(response.data.username);
       }
  }
  
  init();

  return (
    <>
    
      <Router>
          <Appbar/>
          <Routes>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/addCourse" element={<AddCourse/>}/>
          <Route path="/course/:courseId" element={<Course/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          </Routes>
      </Router>
    
      
    </>
  )
}

export default App
