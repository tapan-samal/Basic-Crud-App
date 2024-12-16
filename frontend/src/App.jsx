import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
