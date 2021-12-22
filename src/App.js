import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

/* components */
import Home from "./pages/Home/Index";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
