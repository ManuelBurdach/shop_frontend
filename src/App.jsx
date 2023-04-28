import { useEffect, useState } from "react";
import "./App.css";
import TopBar from "./components/topBar/TopBar.jsx";
import UserContext from "./context/UserContext.js";
import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState({ firstname: "Guest", isLoggedIn: false });
  const FETCH_LINK =
    import.meta.env.VITE_BACKEND +
    import.meta.env.VITE_API_VERSION +
    import.meta.env.VITE_USER +
    "verify";

  useEffect(() => {
    const verifyUser = async () => {
      const user = await fetch(FETCH_LINK, {
        credentials: "include",
      });
      if (user.ok) setUser(await user.json());
    };
    verifyUser();
  }, []);
  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <SideBar />
        <div className="TopBarAndPage">
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
