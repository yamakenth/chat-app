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
import { EMPTY_USER, User } from "../types";
import { isEmptyObject } from "../utils";

type ChatProviderProps = {
  children: ReactNode;
};

const ChatContext = createContext({
  user: EMPTY_USER,
  setUser: (() => {}) as Dispatch<SetStateAction<User>>,
});

const ChatProvider = ({ children }: ChatProviderProps) => {
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
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
