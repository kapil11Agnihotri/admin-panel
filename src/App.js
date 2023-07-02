import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Auth/LoginPage";
import Sidebar from "./Components/SideBar/SideBar"
import UserModule from "./Components/UserModule/UserModule";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthContext } from "./Store/AuthContext";
import Header from "./Components/Header/Header";


const App = () => {
   
  const authCtx=useContext(AuthContext)
  const isLoggedIn=authCtx.isLoggedIn;

  return (
    <Router>
       {isLoggedIn && <Header/>}
      <div style={{display:'flex'}}>
       
        {isLoggedIn && <Sidebar/>}

        <Routes>
          {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
          {isLoggedIn && <Route path="/user" element={<UserModule />} />}
          {!isLoggedIn && <Route path="/" element={<LoginPage />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
