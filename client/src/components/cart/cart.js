import React ,{useEffect,useState}from "react";
import '../model.css';
import { useSelector } from "react-redux";
import { loginSlice, selectUser } from "../../userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
export const Cart = () => {
    let dispatch = useDispatch();
    let cart_image = 'https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png';
    let [items,setItems] = useState([]);
    let [total,setTotal] = useState(0);
    const [isClicked, setIsCliked] = useState(false);
    let g = useSelector(selectUser);
    let cartId = g?g.data.cart_id:1;
    if(cartId === undefined){
        cartId = 1;
    }
 
    const deleteHandler=async(id)=>{
        try {
            let [appClicked] = items.filter(app=>app.game_id === id);
            const body = {game_id:appClicked.game_id}
            let response = fetch(`http://localhost:3000/cart/delete/${cartId}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            let newItems = items.filter(app=>app.game_id !== id)
            setItems(newItems);
            // setTotal(()=>{
            //     let r = 0;
            //     items.forEach(item=>{
            //         r+= parseFloat(item.price.substring(1))
            //     })
            //     return r;
            // })
        } catch (err) {
            console.error(err.message);
        }
    }
    const getCartItems = async()=>{
        
        try {
            
            let response = await fetch(`http://localhost:3000/cart/${cartId}`);
            let JSONData = await response.json();
            setItems(JSONData);
            // setTotal(()=>{
            //     let r = 0;
            //     items.forEach(item=>{
            //         r+= parseFloat(item.price.substring(1))
            //     })
            //     return r;
            // })
        } catch (err) {
            console.error(err.message);
        }
    }

    
    const countTotal = ()=>{
        let r = 0;
        items.forEach(item=>{
            
            r+= parseFloat(item.price.substring(1))
            
            
        })
        return r;
    }
    useEffect(()=>{
      
        getCartItems();
        
    },[isClicked]);

    return (
        <div>
        <button type="button" className="btn btn-lg" data-toggle="modal" data-target="#myModal" onClick={()=>isClicked==true?setIsCliked(false):setIsCliked(true)}><img src={cart_image}/></button>

        <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

            
            <div className="modal-content modalBody">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                
            </div>
            <div className="modal-body">
             {items.length===0?<h3 className="mt-5 mb-5">There are no items here! Try going to the main page and adding apps to your cart.</h3>:
             items.map(app =>{     
                      
                return (
//onClick={()=>window.location = `/${app.game_id}`}
                <div key={app.game_id}>

                    <img alt={app.title} src={app.image} width='130px' height='130px'/>
                    <h1>{app.title} {app.price}</h1>
                    <button onClick={()=>deleteHandler(app.game_id)}>Delete</button>

                </div>

                )
            }
            
            )
            
            }
           
            <h2 className="mt-4">Cart total = ${countTotal()}</h2>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" >Close</button>
            </div>
            </div>

        </div>
        </div>
        
        </div>
    )
}

