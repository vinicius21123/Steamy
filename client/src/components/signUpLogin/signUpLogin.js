import React, { useEffect, useState } from "react";
import "./signUpLogin.css";
import '../model.css';
import axios from 'axios';
import { loginSlice } from "../../userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";
export const SignUpLogin = ()=>{
    let dispatch = useDispatch();
    let [isLogin,setIsLogin] = useState(true);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    let [logout,setLogout] = useState(false);
    let g = useSelector(selectUser);    
    
    const login = ()=>{
        axios({
            method:'post',
            data:{
                email:loginEmail,
                password:loginPassword
            },
            withCredentials:true,
            url:"http://localhost:3000/login",
        }).then((res)=>{
            if(res.data !== 'No user Exists'){
                dispatch(loginSlice({data:res.data}));
                setLogout(true);
                document.getElementById('loginBar').style.display = 'block'
            }

        });
    };
    const register = ()=>{
        axios({
            method:'post',
            data:{
                email:registerEmail,
                password:registerPassword
            },
            withCredentials:true,
            url:"http://localhost:3000/register",
        }).then((res)=>{
            if(res.data === 'User created'){
                document.getElementById('registerBar').style.display = 'block'
            }
        });
    };
    
    const logOut = ()=>{
        setData(null)
        axios({
            method:'get',
            withCredentials:true,
            url:"http://localhost:3000/logOut",
        })
        console.log('after')
        window.location.reload();
    }
    useEffect(()=>{
        if(g !== null){
            if(g.data.user_id){
                console.log('log')
                setLogout(true);
            }
        }
        
    },[g])

    const clearForm=()=>{
        document.getElementById('form1').reset();

        setLoginEmail('');
        setLoginPassword('');
        setRegisterEmail('');
        setRegisterPassword('');
        }
    
    const form = ()=>{
        if(isLogin){
           return( 
        //    <form action="http://localhost:3000/login" method="post">
            <div>
            <div className="container">
                <form id='form1'>
                <label><b>Email</b></label>
                <input id="inputToClear1" type='text' placeholder="Enter Email" value={loginEmail} required onChange={e=>setLoginEmail(e.target.value)}/>

                <label><b>Password</b></label>
                <input id="inputToClear2" type='password' placeholder="Enter Password" value={loginPassword} required onChange={e=>setLoginPassword(e.target.value)}/>

                <button data-dismiss="modal" type="submit" onClick={(e)=>{
                    e.preventDefault();
                    login()
                    
                }}>Login</button>
                </form>
            </div>

            <div className="container">
                <button type="button" className="cancelbtn" data-dismiss="modal">Cancel</button>
                <button type="button" className="registerbtn" onClick={()=>{
                    setIsLogin(false);
                    clearForm();
                    }}>I do not have a login!</button>
            </div>
            </div>
            //</form>
            )
        }
        else{
            return(
            //<form action="http://localhost:3000/register" method="POST">
            <div>
            <div className="container">
                <form id='form2'>
                <label><b>Create Email</b></label>
                <input id="inputToClear3" type='text' placeholder="Enter Email" value={registerEmail} required onChange={e=>setRegisterEmail(e.target.value)}/>

                <label ><b>Create Password</b></label>
                <input id="inputToClear4" type='password' placeholder="Enter Password" value={registerPassword} required onChange={e=>setRegisterPassword(e.target.value)}/>

                <button type="submit" onClick={(e)=>{
                    e.preventDefault();
                    register();
                    }}>Register</button>
                </form>
            </div>

            <div className="container">
                <button type="button" className="cancelbtn" onClick={()=>setIsLogin(true)}>Cancel</button>

            </div>
            {/* </form> */}
            </div>
            )
        }
    }
    return(
        <div>
        {logout?<button onClick={logOut}>Log out</button>:<button type="button" className="btn btn-lg" data-toggle="modal" data-target="#myModal1">{isLogin?'Login':'Register'}</button>}
        
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
