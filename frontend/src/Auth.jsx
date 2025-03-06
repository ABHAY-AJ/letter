import { useEffect, useState } from "react";
import axios from "axios";

export default function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <a href="http://localhost:5000/auth/logout">Logout</a>
        </div>
      ) : (
        <a href="http://localhost:5000/auth/google">Login with Google</a>
      )}
    </div>
  );
}
