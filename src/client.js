import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import  routes  from "./routes";
import { Routes, Route } from "react-router";


function App() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App initial={window.__INITIAL_STATE__} />
  </BrowserRouter>
);
