import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import { useEffect } from "react";
import { userInfo } from "./redux/features/user/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
