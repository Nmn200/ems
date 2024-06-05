import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/user";
import UserTable from "./pages/userTable";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Users />} />
      <Route path="/" element={<UserTable />} />
    </Routes>
  );
}

export default App;
