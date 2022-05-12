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
function App() {
    // HTML element
    document.documentElement.style.overflow = "hidden";
    document.title = "🛴 RideMate";

    let c = (
        <div>
            {/* <nav>
      <Link to='login'>Login</Link>
      <Link to='tricklist'>Tricks</Link>
    </nav> */}
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tricklist" element={<TrickList />} />
                </Route>
            </Routes>
            <Toaster position="bottom-center" />
            {/* <button onClick={test}>aaaaa</button> */}
        </div>
    );

    return c;
}

function test() {
    toast.success("oui");
}

export default App;
