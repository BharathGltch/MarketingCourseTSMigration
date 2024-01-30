import { Card, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddCourse(){
    
    const [courseName,setCourseName]=useState("");
    const [courseImage,setCourseImage]=useState("");
    const [courseDescription,setCourseDescription]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
          fetch("http://localhost:3000/admin/me",{
            "method":"GET",
            "headers":{
                "authorization": "Bearer "+localStorage.getItem('token'),
                
            }
          }).then((obj)=>{obj.json().then((data)=>{if(data){
            console.log(data);
            
          }else{
            navigate("/signin");
          }})})
    },[]);

    return(
        <div style={{display:"flex",justifyContent:"center",alignContent:"center",height:"100%"}}>
            <Card variant="outlined" style={{padding:"20px",marginTop:"50px"}}>
              <TextField  variant="outlined" style={{marginTop:"20px"}} type={"text"} label={"Course Name"} onChange={(e)=>{setCourseName(e.target.value)}} fullWidth={true}/>
              <TextField  variant="outlined" style={{marginTop:"20px"}} type={"text"} label={"Course Image"} onChange={(e)=>{setCourseImage(e.target.value)}} fullWidth={true}/>
              <TextField  variant="outlined" style={{marginTop:"20px"}} type={"text"}  label={"Course Description"} onChange={(e)=>{setCourseDescription(e.target.value)}} fullWidth/>
              <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
              <Button variant="contained"  style={{marginTop:"10px"}} size="large" onClick={()=>{
               fetch("http://localhost:3000/admin/addCourse",{
                "method":"POST",
                "headers":{
                    "authorization":"Bearer "+localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                "body":JSON.stringify({
                    courseName:courseName,
                    courseImage:courseImage,
                    courseDescription:courseDescription
                })
               })
              }}>Submit</Button>
              </div>
            </Card>
        </div>
    )
}

export default AddCourse;