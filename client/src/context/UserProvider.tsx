import { User } from "@types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { EMPTY_USER } from "../constants";
import { isEmptyObject } from "../utils";

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext({
  user: EMPTY_USER,
  setUser: (() => {}) as Dispatch<SetStateAction<User>>,
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(EMPTY_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
    if (isEmptyObject(userInfo)) {
      navigate("/");
    }
    setUser(userInfo);
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
