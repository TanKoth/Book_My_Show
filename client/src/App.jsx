// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/index.jsx";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import Admin from "./Pages/Admin/index.jsx";
import Partner from "./Pages/Partner/index.jsx";
import Profile from "./Pages/User/index.jsx";
import SingleMovie from "./Pages/Home/SingleMovie.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path={"/register"} element={<Register />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route
            path={"/admin"}
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/partner"}
            element={
              <ProtectedRoute>
                <Partner />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/profile"}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <SingleMovie />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
