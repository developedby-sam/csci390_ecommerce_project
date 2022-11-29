import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
// components
import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import Shoppage from "./pages/shoppage/shoppage.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Registerpage from "./pages/registerpage/registerpage.component";
import Signinpage from "./pages/siginpage/signinpage.component";
import Footer from "./components/footer/footer.component";

function App() {
  const [isLogedin, setIsLogedin] = useState(false);
  const [user, setUser] = useState({});
  return (
    <div>
      <Header isLogedin={isLogedin} setIsLogedin={setIsLogedin} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shoppage user={user} />} />
        <Route path="/checkout" element={<CheckoutPage user={user} />} />
        <Route
          path="/register"
          element={
            <Registerpage setIsLogedin={setIsLogedin} setUser={setUser} />
          }
        />
        <Route
          path="/signin"
          element={<Signinpage setIsLogedin={setIsLogedin} setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
