import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./TopBar.css";

const TopBar = () => {
  const [user] = useContext(UserContext);
  const startSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div className="TopBar">
      <p>
        Hello {user?.firstname}
        {user?.isLoggedIn && ", Welcome Back!"}
      </p>
      <p>{user.isLoggedIn && "Messages"}</p>
      <form onSubmit={startSearch}>
        <input type="text" placeholder="Search" />
      </form>
    </div>
  );
};

export default TopBar;
