import useStrava from "@/hooks/useStrava";
import { createContext, useContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { user, logout } = useStrava();

  const value = {
    user,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
export default UserContextProvider;