import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function SignIn(){

    const [userName,setUserName]=useState<string>();
    const [password,setPassword]=useState<string>();
    return(
        <>
        <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
            <Card variant="outlined" style={{marginTop:'100px',padding:'20px'}}>
            <TextField variant="outlined" type={"text"} onChange={(e)=>{setUserName(e.target.value)}} label="Username" fullWidth={true}></TextField>
            <TextField variant="outlined" type={"password"} onChange={(e)=>{setPassword(e.target.value)}} label="Password" fullWidth={true} style={{marginTop:"10px"}}></TextField>
            <div style={{display:'flex',justifyContent:'center',alignContent:'center',marginTop:'10px'}}>
            <Button variant="contained" size="large" onClick={()=>{
                    function callback1(response:any){
                        console.log(response.data);
                        localStorage.setItem('token',response.data.token);
                        window.location.href="/";
                    }

                 axios.post("http://localhost:3000/admin/signin",{
                     username:userName,
                     password:password
                 }).then(callback1);
              }}>SignIn</Button>
            </div>
            </Card>
        </div>
        </>
    )
}

export default SignIn;