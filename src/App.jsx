import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestrictedRoute from "./routes/RestrictedRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ConditionalRoute from "./routes/ConditionalRoute.jsx";
import Loader from "./components/Loader/Loader.jsx";

import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage.jsx"));
const SighinPage = lazy(() => import("./pages/SigninPage/SigninPage.jsx"));
const SighupPage = lazy(() => import("./pages/SignupPage/SignupPage.jsx"));
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

import { selectIsRefreshing } from "./redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";

import { refreshUser, logout } from "./redux/auth/operations.js";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        try {
          await dispatch(refreshUser()).unwrap();
        } catch (error) {
          // console.error("Failed to refresh user:", error);

          if (error.response?.status === 401) {
            dispatch(logout());
            navigate("/signin");
          }
        }
      }
    };

    checkSession();
  }, [dispatch, navigate]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<ConditionalRoute />} />
          <Route
            path="welcome"
            element={
              <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/signin" />
            }
          />
          <Route
            path="signin"
            element={
              <RestrictedRoute component={<SighinPage />} redirectTo="/home" />
            }
          />
          <Route
            path="signup"
            element={
              <RestrictedRoute component={<SighupPage />} redirectTo="/home" />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
