import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { AllApps } from './components/renderAllApps/allApps';
import {SingleApp} from './components/renderSingleApp/singleApps';
import { Nav } from './components/nav/nav';
import { Cart } from './components/cart/cart';
function App() {

  return (
      <div>
        <Nav />
        <Routes>
            <Route path="/" element={<AllApps/>} /> 
            <Route path="/:gameId" element={<SingleApp/>} /> 
            {/* <Route path="/cart/:cart_id" element={} />  */}
        </Routes>
      </div> 
    )
  
}

export default App;
