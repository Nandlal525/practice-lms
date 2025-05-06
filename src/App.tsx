import { Routes, Route, Navigate } from "react-router";
import Register from "./pages/register";
import AppLayout from "./layout/appLayout";
import Login from "./pages/login";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  let decodedToken = null;
  try {
    decodedToken = token && jwtDecode(token);
    console.log({ decodedToken });
  } catch (err) {
    console.log(err);
  }

  // if token is valid, redirect to main app
  // if token is invalid, redirect to login
  return decodedToken ? <AppLayout /> : <Navigate to="/login" />;
};
function App() {
  return (
    
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes />}>
      
        {/* These routes is rendered by Outlet in AppLayout */}
        <Route path="/books" element={<p>Books</p>} />
        <Route path="/members" element={<p>Members</p>} />
        <Route path="/transactions" element={<p>Transactions</p>} />
      </Route>
      {/* TODO: add route for login page */}
    </Routes>
    
  );
}

export default App;