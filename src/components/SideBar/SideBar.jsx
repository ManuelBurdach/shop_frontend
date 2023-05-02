import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { useContext, useRef } from "react";
import UserContext from "../../context/UserContext";

const SideBar = () => {
  const [user, setUser] = useContext(UserContext);
  const FETCH_LINK =
    import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION + import.meta.env.VITE_USER;
  const email = useRef();
  const password = useRef();

  const login = async (e) => {
    e.preventDefault();
    const loginResult = await fetch(FETCH_LINK + "login", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email.current.value, password: password.current.value }),
    });
    if (loginResult.ok) setUser(await loginResult.json());
  };
  const logout = async () => {
    const logoutResult = await fetch(FETCH_LINK + "logout", {
      credentials: "include",
    });
    const guest = await logoutResult.json();
    setUser(guest);
  };
  return (
    <div className="SideBar">
      <p>Profilbilld</p>
      <div>
        <h1>ShopName</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      {!user?.isLoggedIn && (
        <>
          <form onSubmit={login}>
            <h2>Login:</h2>
            <input
              type="email"
              ref={email}
              placeholder="E-Mail"
              required
              defaultValue={"manuelburdach@outlook.de"}
            />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              required
              defaultValue={"Manuel-1991"}
            />
            <input type="submit" value="Lets Go" />
            <input type="button" value="Register" />
          </form>
        </>
      )}
      <nav>
        <NavLink to="/">Home</NavLink>
        {user?.isLoggedIn && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        )}
      </nav>

      {user?.isLoggedIn && (
        <div className="logout" onClick={logout}>
          Go Out
        </div>
      )}
    </div>
  );
};

export default SideBar;
