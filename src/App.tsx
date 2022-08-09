import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemBoard from "./components/ItemBoard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="itemboard" element={<ItemBoard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
