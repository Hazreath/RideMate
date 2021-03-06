import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./stores/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * RIDEMATE REACT CORE
 * Comes before everything else
 * Contains store provider, router, and App
 */
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='tricklist' element={<TrickList />} />
        </Route>
        
      </Routes>
      {/* <App />  */ //}
// </BrowserRouter>

// </React.StrictMode>
