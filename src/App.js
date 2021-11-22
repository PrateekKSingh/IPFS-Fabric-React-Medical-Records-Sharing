import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import GeneralUserReg from "./components/GeneralUserReg";
import HosLabReg from "./components/HosLabReg";
import InsuranceComp from "./components/InsuranceComp";
import DocReg from "./components/DocReg";
import Login from "./components/Login"; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  return (
      <div>
          <BrowserRouter>
              <div className="header">
                  <NavLink exact="true" activeclassname="active" to="/generalUserReg">GeneralUser Registration</NavLink>
                  <NavLink exact="true" activeclassname="active" to="/hosLabReg">Hospital/LabRegistration</NavLink>
                  <NavLink exact="true" activeclassname="active" to="/insuranceComp">InsuranceCompany Registration</NavLink>
                  <NavLink exact="true" activeclassname="active" to="/docReg">Doctor Reg</NavLink>
                  <NavLink exact="true" activeclassname="active" to="/login">Login</NavLink>
              </div>
              <div className="content">
                  <Routes>
                      <Route exact="true" path="/generalUserReg" element={<GeneralUserReg/>} />
                      <Route path="/hosLabReg" element={<HosLabReg/>} />
                      <Route path="/insuranceComp" element={<InsuranceComp/>} />
                      <Route path="/docReg" element={<DocReg/>} />
                      <Route path="/login" element={<Login/>} />
                  </Routes>
              </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
