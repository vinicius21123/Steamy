import React , { useState ,useEffect} from 'react';
import { DisplayApp } from '../appComponents/appLayout';
export const AllApps = ()=>{
    const [apps,setApps] = useState([]);
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
    
    useEffect(()=>{
        getApps();
    },[]);
    
    return(
        <DisplayApp data={apps}/>
    )
}
