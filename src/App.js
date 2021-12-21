import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* components */
import Home from "./pages/Home/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
