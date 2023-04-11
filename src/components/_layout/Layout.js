import Profile from "../profile/Profile";
import Login from "../login/Login";
import Uploader from "../uploader/Uploader";
import Logout from "../logout/Logout";
import { useUserContext } from "@/contexts/user.context";

const Layout = ({ }) => {
  const { user } = useUserContext();

  if (!user) return <Login />;

  return (
    <>
      <Profile user={user} />
      <Uploader />
      <Logout />
    </>
  );
}

export default Layout;