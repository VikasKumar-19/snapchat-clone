import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
