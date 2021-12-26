import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./components/Layout";

/* components */
import Home from "./pages/Home/Index";
import Favorites from "./pages/Favorites/Index";
import Error404 from "./pages/404/Index";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Container className='min-vh-100'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </Container>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
