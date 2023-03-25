import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { store } from "./redux/store";

import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<MainLayout />}>
          <Route exact index element={<Home />} />
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
