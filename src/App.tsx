import { Routes, Route } from "react-router";
import Register from "./pages/register";
import AppLayout from "./layout/appLayout";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AppLayout />}>
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