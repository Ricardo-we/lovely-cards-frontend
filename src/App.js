import 'bootswatch/dist/quartz/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import UserHome from "./views/UserHome";
import CardView from './views/CardView';
import CreateUser from "./views/CreateUser";
import HomePage from './views/Homepage.jsx'
import Login from './views/Login';
import ManageCardContents from './views/CardManagement/ManageCardContents'
import ManageCards from "./views/CardManagement/ManageCards";
import React from "react";

function App() {
  return (
    <BrowserRouter>
		<Routes>
			{/* NOT REGISTERED */}
			<Route path='*' element={<HomePage/>}/>
			<Route path='/' element={<HomePage/>}/>
			{/* LOGIN */}
			<Route path="/login" element={<Login/>}/>
			<Route path="/create-user" element={<CreateUser/>}/>

      		{/* MANAGE CARDS UI UserHome MANAGE ALL CARDS AND CardView SHOWS THE ACTUAL CARD */}
			<Route path="/user-home/:username" element={<ManageCards/>}/>
			<Route path="/manage-card-contents/:cardId" element={<ManageCardContents/>}/>
			<Route path="/card-view/:cardID" element={<CardView/>}/>
		</Routes>
    </BrowserRouter>
  );
}

export default App;
// export const APIURL = 'https://lovely-cards-api.herokuapp.com'
export const APIURL = 'http://localhost:5000'
