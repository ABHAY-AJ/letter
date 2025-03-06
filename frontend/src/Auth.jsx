import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./api";
import "./Auth.css"; // Import CSS file

export default function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/user`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="auth-container">
      {user ? (
        <div className="user-info">
          <h2>Welcome, {user.name}</h2>
          <a href="https://letter-w045.onrender.com/auth/logout" className="logout-btn">
            Logout
          </a>
        </div>
      ) : (
        <a href="https://letter-w045.onrender.com/auth/google" className="login-btn">
          Login with Google
        </a>
      )}
    </div>
  );
}
