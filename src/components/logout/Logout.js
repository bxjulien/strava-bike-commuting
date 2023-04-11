import { useUserContext } from "@/contexts/user.context";

const Logout = () => {
  const { logout } = useUserContext();

  return (
    <button onClick={logout}>Log Out</button>
  );
}

export default Logout;