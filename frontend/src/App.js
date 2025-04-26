import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add a default route to handle 404 or undefined routes */}
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
