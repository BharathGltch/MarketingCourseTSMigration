import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import {useSetRecoilState,useRecoilValue} from "recoil";
import  {courseState} from "./store/atom/courseAtom";


function Course(){
    let {courseId}=useParams();
    const [courses,setCourses]=useState([]);
     let setCourse=useSetRecoilState(courseState);

    useEffect(()=>{
        function callback2(data:any){
            setCourses(data.Courses);
        }

        function callback1(res:any){
            console.log("Inside callback1");
            res.json().then(callback2);
        }

         fetch("http://localhost:3000/admin/courses",{
            method:"GET",
            headers:{
                "authorization":"bearer "+localStorage.getItem('token')
            }
         }).then(callback1);

        },[]);

        console.log(courses);
        

     let course=null;
     for(let i=0;i<courses.length;i++){
        
         if(courses[i].courseID==courseId){
             course=courses[i];
             setCourse(course);
             break;
         }
     }
   if(course==null){
    return <div>
        Loading...
    </div>
   }
    return(
       <div>
        <CourseCard/>
        <UpdateCourse/>
       </div>
       
    )
}

function UpdateCourse(){

   let course=useRecoilValue(courseState);
   let setCourse=useSetRecoilState(courseState)
    const [courseName,setCourseName]=useState(course.courseName);
    const [courseDesc,setCourseDesc]=useState(course.courseDescription);
    const [imageUrl,setImageUrl]=useState(course.courseImage);
      ;
       
    if(course==null){
        return <div></div>
    }

    return(
        <div>
           <Card variant="outlined" style={{padding:"20px",marginTop:"10px",height:"300px",width:"250px"}}>
              <TextField  variant="outlined" style={{marginTop:"20px"}} type={"text"} label={"Course Name"} onChange={(e)=>{setCourseName(e.target.value)}} fullWidth/>
              <TextField  variant="outlined" style={{marginTop:"20px"}} type={"text"} label={"Course Description"} onChange={(e)=>{setCourseDesc(e.target.value)}} fullWidth/>
              <TextField  variant="outlined" style={{marginTop:"20px"}} type={"text"}  label={"Course Image"} onChange={(e)=>{setImageUrl(e.target.value)}} fullWidth/>
              <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
              <Button variant="contained"  style={{marginTop:"10px"}} size="large" onClick={()=>{
               fetch("http://localhost:3000/admin/course/"+course.courseID,{
                "method":"PUT",
                "headers":{
                    "authorization":"Bearer "+localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                "body":JSON.stringify({
                    courseName:courseName,
                    courseDescription:courseDesc,
                    courseImage:imageUrl,
                    courseID:course.courseID
                })
               }).then((obj)=>{obj.json().then((data)=>{
                    setCourse({
                        courseName:courseName,
                        courseDescription:courseDesc,
                        courseImage:imageUrl,
                        courseID:course.courseID
                    })
                    // props.setCourses(tempCourses);
                
                    alert('Course Updated');
               })})
              }}>Submit</Button>
              </div>
            </Card>
        </div>
    )
}


function CourseCard(){

    let course=useRecoilValue(courseState);
    if(course==null){
        return(
            <div>
                Course Not found
            </div>
        )
    }
   return(
    <Card style={{marginTop:"10px",minHeight:"300px",width:"300px"}}>
        
        <Typography variant="h6" textAlign={"center"} >{course.courseName}</Typography>
    
        <Typography variant="h6" textAlign={"center"}>{course.courseDescription}</Typography>
        
        <img src={course.courseImage} alt="Image not found" style={{maxHeight:"300px"}}/>
    </Card>
   )
}


export default Course;