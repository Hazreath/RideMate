import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

import Banner from "./components/Banner";
import ParkList from "./components/ParkList";
import Menu from "./components/Menu";
import "./styles/bulma.min.css";
import NewTrickModal from "./components/NewTrickModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TrickList from "./pages/TrickList";
// import Toaster from "./components/Toaster";
import { Toaster, toast } from "react-hot-toast";
import Profile from "./pages/Profile";
import { Helmet, HelmetProvider } from "react-helmet-async";

/**
 * RideMate React app
 * Contains <head> modifications, Router/Routes and Toaster
 * @returns JSX Content
 */
function App() {
    // HTML element
    // document.documentElement.style.overflow = "hidden";
    document.title = "🛴 RideMate";

    let c = (
        <HelmetProvider>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1"
                />
            </Helmet>
            {/* <nav>
      <Link to='login'>Login</Link>
      <Link to='tricklist'>Tricks</Link>
    </nav> */}
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tricklist" element={<TrickList />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
            <Toaster position="bottom-center" />
            {/* <button onClick={test}>aaaaa</button> */}
        </HelmetProvider>
    );

    return c;
}

export default App;
