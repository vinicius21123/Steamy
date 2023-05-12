import React,{useState}from "react";
import './appComponents.css';
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";
export const DisplayApp = (props) =>{
    let apps = props.data;
    let g = useSelector(selectUser);
    let cartId = g?g.data.cart_id:1;
    let userId = g?g.data.user_id:1;
    if(cartId === undefined){
        cartId = 1;
    }
    let data = apps.filter(app=>app.price === '$0.00');
    let [appsSearched,setAppsSearched] = useState([])
    let [searching,setSearching] = useState(false)
    let [checked,setChecked] = useState(false)
    let [searchTerm,setSearchTerm] = useState('')
    const addToCart = async (id)=>{
        try {
            let [appClicked] = apps.filter(app=>app.game_id === id);
            const body = {cart_id:cartId,game_id:appClicked.game_id,user_id:userId}
            let response = fetch(`http://localhost:3000/cart`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });



        } catch (err) {
            console.error(err.message);
        }
    }
    const filterApps = ()=>{
        var checkBox = document.getElementById("myCheckBox");
        if(checkBox.checked == true){
            setChecked(true)
        }
        else if(checkBox.checked == false){
            setChecked(false)
        }

        
    }
    const search = (e)=>{
        
        let term = e.target.value;
        if(term !==''){
            setSearching(true);
        }
        else{
            setSearching(false);
        }
        setSearchTerm(term)
        let searchedApps = apps.filter(app=>app.title.toLowerCase().includes(term))
        setAppsSearched(searchedApps)
        console.log(appsSearched)

    }
    const renderApps = (dataToRender)=>{
        return(
            dataToRender.map(app =>(
                (
//onClick={()=>window.location = `/${app.game_id}`}
                <div className='appHolder' key={app.game_id} >

                    <img className="appImage" alt={app.title} src={app.image}/>
                    <div className="textBit">
                        <h1>{app.title}</h1>
                        <h3>{app.price}</h3>
                        <button onClick={()=>{
                            addToCart(app.game_id);
                            }}>Add to Cart</button>
                    </div>

                </div>

                )
            ))
        )
    }
    const manager = ()=>{
        if(searching){
            return renderApps(appsSearched);
        }
        if(checked){
            return renderApps(data);
        }else{
            
            return renderApps(apps);
        }
        
    }
    
    return(
        <div>
        <div className="checkBox">
                <input type="checkbox" id='myCheckBox' onClick={()=>filterApps()}/> Free Apps
                <input id="searchBar" type="text" placeholder="Search the name of an app" value={searchTerm} onChange={(e)=>search(e)}/>
                
        </div>
        <div className="appsContainer">
            
             {manager()} 
        </div>
        </div>
    )
}