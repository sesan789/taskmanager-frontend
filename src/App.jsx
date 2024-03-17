import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthMiddleware from "./middleware/AuthMiddleware";
import routes from "./routes/routes";
import NotFound from "./views/pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <AuthMiddleware
                  isPrivate={route.isPrivate}
                  element={<route.component />}
                />
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
