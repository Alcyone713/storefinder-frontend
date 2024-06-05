import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import AdminPage from "./Components/AdminPage";
import FavouriteStores from "./Components/FavouriteStores";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NotAuthorized from "./Components/NotAuthorized";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route element={<ProtectedRoutes allowedRoles={['user']}/>}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/favourite" element={<FavouriteStores />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
