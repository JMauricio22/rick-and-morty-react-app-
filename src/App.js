import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "./components/Layout";

/* components */
import Home from "./pages/Home/Index";
import Favorites from "./pages/Favorites/Index";
import Profile from "./pages/Profile/Index";
import Error404 from "./pages/404/Index";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop>
          <Container className='min-vh-100'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/character/:id' element={<Profile />} />
              <Route path='/*' element={<Error404 />} />
            </Routes>
          </Container>
        </ScrollToTop>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
