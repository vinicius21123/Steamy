import React from "react";
import { Cart } from "../cart/cart";
import { SignUpLogin } from "../signUpLogin/signUpLogin";
import './nav.css';
export const Nav = ()=>{
    let logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png';
    return(
        <div className="navContainer">
            <ul>
                <li><img className="logoImg" src={logo}/></li>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>About us</a></li>
                <li><a href='/'>Contact us</a></li>
                <li className="toTheRight"><SignUpLogin/></li>
                <li className="toTheRight cartImg"><Cart/></li>
                

            </ul>
        </div>
    )
}