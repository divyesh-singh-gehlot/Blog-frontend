import { createContext, useState, useEffect , useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stringifySessionData = window.localStorage.getItem("sessionData");

    if (stringifySessionData) {
      const sessionData = JSON.parse(stringifySessionData);
      const user = sessionData.user;
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
}