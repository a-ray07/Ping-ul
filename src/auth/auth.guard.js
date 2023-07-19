import { useContext } from "react";
import AuthState from "../auth/Authcontext";
import Chatpage from "../components/Chatpage";

const ProtectedChatpage = ({ component: Component, ...rest }) => {
  const { isLoggedIn, navigate } = useContext(AuthState);

  if (!isLoggedIn) {
    return <navigate to="/" replace />;
  } else {
    return <Chatpage />;
  }
};

export default ProtectedChatpage;
