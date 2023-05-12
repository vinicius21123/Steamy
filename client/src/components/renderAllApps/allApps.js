import React , { useState ,useEffect} from 'react';
import { DisplayApp } from '../appComponents/appLayout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSlice } from '../../userSlice';
export const AllApps = ()=>{
    document.addEventListener("click", function(e) {
        if (e.target.className.indexOf("bottom-bar__close") !== -1) {
          document.getElementById('loginBar').style.display = 'none'
        }
      });

      document.addEventListener("click", function(e) {
        if (e.target.className.indexOf("bottom-bar__close1") !== -1) {
          document.getElementById('registerBar').style.display = 'none'
        }
      });
    const [apps,setApps] = useState([]);
    let dispatch = useDispatch();
    const getApps = async()=>{
        let response;
        
        try {  
            response = await fetch(`http://localhost:3000/apps`)
            let appToReturn = await response.json();
            setApps(appToReturn);
        } catch (err) {
            console.error(err.message);
        }

    }
    const getUser = ()=>{
        axios({
            method:'get',
            withCredentials:true,
            url:"http://localhost:3000/getUser",
        }).then((res)=>{
           
            dispatch(loginSlice({data:res.data}));

        }
        );
    };
    useEffect(()=>{
        getApps();
        getUser();
    },[]);
    
    return(<div>
        <div id='loginBar' className="bottom-bar" data-bottombar="cookieMessage">
        <div className="bottom-bar__content">
        <div className="bottom-bar__text">
            You have Successfuly logged in!
        </div>
  
        <button className="bottom-bar__close" type="button" data-bottombar-close="cookieMessage">&times;</button>
        </div>
        </div>

        <div id='registerBar' className="bottom-bar" data-bottombar="cookieMessage1">
        <div className="bottom-bar__content">
        <div className="bottom-bar__text">
            You have Successfuly registered, please log in!
        </div>
  
        <button className="bottom-bar__close1" type="button" data-bottombar-close="cookieMessage1">&times;</button>
        </div>
        </div>
        


        <DisplayApp data={apps}/>
    </div>)
}
