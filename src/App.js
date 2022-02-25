import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootswatch/dist/quartz/bootstrap.min.css';
// import UserHome from "./views/UserHome";
import CardView from './views/CardView';
import Login from './views/Login';
import CreateUser from "./views/CreateUser";
import ManageCards from "./views/CardManagement/ManageCards";
import ManageCardContents from './views/CardManagement/ManageCardContents'

function App() {
  return (
    <BrowserRouter>
		<Routes>
			{/* LOGIN */}
			<Route path='*' element={<Login/>}/>
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
export const APIURL = 'https://lovely-cards-api.herokuapp.com'
