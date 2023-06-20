import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ItemBoard from "./templates/ShoppingList/ItemBoard";
import Login from "./templates/Auth/Login";
import SignUp from "./templates/Auth/SignUp";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/itemboard" element={<ItemBoard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* replaceを付けると、指定されたURLページに置き換えるのと、
ブラウザの戻るボタンを使って以前のページに戻ることができないようにする。 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
