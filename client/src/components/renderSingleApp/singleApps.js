import React , { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { DisplayApp } from '../appComponents/appLayout';
export const SingleApp = ()=>{
    let { gameId } = useParams();
    const [apps,setApps] = useState([]);
    const getApps = async()=>{
        let response;

        try {
            response = await fetch(`http://localhost:3000/apps/${gameId}`)
            const singleApp = await response.json();
            setApps(singleApp);
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
