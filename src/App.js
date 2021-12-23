import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./components/Layout";

/* components */
import Home from "./pages/Home/Index";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
