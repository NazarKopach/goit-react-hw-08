import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserIsRefreshing } from "./redux/auth/selectors";
import { Suspense, useEffect } from "react";
import { apiGetCurrentUser } from "./redux/auth/operations";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";

import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/HomePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { ContactsPage } from "./pages/ContactsPage";

function App() {
  const isRefreshing = useSelector(selectUserIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetCurrentUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Refreshing...</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute component={<ContactsPage />} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
