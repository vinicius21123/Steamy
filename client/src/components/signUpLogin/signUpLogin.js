import React, { useEffect, useState } from "react";
import "./signUpLogin.css";
import '../model.css';
import { json } from "react-router-dom";
export const SignUpLogin = ()=>{
    let [isLogin,setIsLogin] = useState(true)
    const form = ()=>{
        if(isLogin){
           return( <form action="http://localhost:3000/login" method="post">

            <div className="container">
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required/>

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required/>

                <button type="submit">Login</button>
                
            </div>

            <div className="container">
                <button type="button" className="cancelbtn" data-dismiss="modal">Cancel</button>
                <button type="button" className="registerbtn" onClick={()=>setIsLogin(false)}>I do not have a login!</button>
            </div>
            </form>)
        }
        else{
            return(<form action="http://localhost:3000/register" method="POST">

            <div className="container">
                <label htmlFor="email"><b>Create Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required/>

                <label htmlFor="psw"><b>Create Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required/>

                <button type="submit">Register</button>
                
            </div>

            <div className="container">
                <button type="button" className="cancelbtn" onClick={()=>setIsLogin(true)}>Cancel</button>

            </div>
            </form>)
        }
    }
    return(
        <div>
        <button type="button" className="btn btn-lg" data-toggle="modal" data-target="#myModal1">{isLogin?'Login':'Register'}</button>

        <div id="myModal1" className="modal fade" role="dialog">
        <div className="modal-dialog">

            
            <div className="modal-content modalBody">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                
            </div>
            <div className="modal-body">
                {form()}
            <div>
            
        </div>


                <button type="button" className="btn btn-default" data-dismiss="modal" >Close</button>
            </div>
            </div>

        </div>
        </div>
        
        
        </div>
    



        
    )
}
