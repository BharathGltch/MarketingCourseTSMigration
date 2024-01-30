import { Card, Typography,TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function SignUp(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    return(
        <div style={{display:'flex',justifyContent:'center',alignContent:'center',height:'100%',paddingTop:'100px'}}>
            <Card variant="outlined" style={{padding:"20px"}}>
              <TextField id="outlined-basic" type={"text"} label="Username" variant="outlined" style={{width:'100%'}} onChange={(e)=>{setUsername(e.target.value)}} />
              <TextField id="outlined" type={"password"} label="Password"  variant="outlined" style={{width:'100%',marginTop:'20px'}} onChange={(e)=>{setPassword(e.target.value)}} />
              <div style={{display:"flex",justifyContent:"center",alignContent:"center",marginTop:'20px'}}>
              <Button variant="contained" size="large" onClick={()=>{
                    function callback1(response){
                        console.log(response.data);
                        localStorage.setItem('token',response.data.token);
                        window.location="/";
                    }

                 axios.post("http://localhost:3000/admin/signup",{
                     username:username,
                     password:password
                 }).then(callback1);
              }}>SignUp</Button>
              </div>
            </Card>
        </div>
        
    )
}

export default SignUp;