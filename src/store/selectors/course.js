import {courseState} from "./atom/courseAtom";
import { selector } from "recoil";


const courseData=selector({
    key:'courseID',
    get:({get})=>{
      const course=get(courseState);
      
      if(course.courseID){
        return course.courseID
      }
      return null;
    }
})