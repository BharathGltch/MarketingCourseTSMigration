import { Typography,Card } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import {useRecoilState} from "recoil";


function Courses(){
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
            fetch("http://localhost:3000/admin/courses",
            {
                method:"GET",
                headers:{
                    "authorization":"Bearer "+localStorage.getItem('token')
                }
            }).then((obj)=>{
                obj.json().then((data)=>{
                     setCourses(data.Courses);
                })
            })
    },[]);

    if(courses.length==0){
        return(
            <div>
                No Courses Found
            </div>
        )
    }

   return(
    <div>
       
        <div style={{display:"flex"}}>
        {courses.map(course=><Course course={course}/>)} 
       </div>
    </div>
   )
}

function Course(props){
 return <Card style={{margin:10,width:300,minHeight:200}} >
    <Typography variant="h6" textAlign={"center"}>
    {props.course.courseName}
    </Typography>
    <Typography variant="h6" textAlign={"center"}>
    {props.course.courseDescription}
    </Typography>
    <img src={props.course.courseImage} style={{width:300}} />
</Card>
    
 

}
export default Courses;