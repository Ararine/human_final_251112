import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URL from "./constants/url";

import "./css/index.css";
import "./css/App.css";

function App() {
  const [userInfo, setUserInfo] = useState();

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <BrowserRouter>
        <Routes>
          <Route path={URL.HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
