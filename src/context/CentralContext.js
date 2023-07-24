import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { personalmessageApi } from "../Services/messages.service";
import AuthState from "./Authcontext";
const { io } = require("socket.io-client");

const CentralState = createContext();

export const CentralStateProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedUser, setSelectedUSer] = useState(null);
  const [isConversationsFetched, setIsConversationFetched] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);
  const { loggedinUserDetails } = useContext(AuthState);

  const token = localStorage.getItem("token");

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") {
      return;
    }

    console.log("Socket ins:", socketInstance);

    if (socketInstance && socketInstance.connected) {
      const newMessage = await emit(
        "messages",
        JSON.stringify({
          conversationGroupId: selectedConversationId,
          text: inputMessage,
        })
      );

      console.log("Socket part");

      setMessages((prev) => {
        prev[selectedConversationId].messages.push(newMessage);
        return prev;
      });

      setInputMessage("");
    } else {
      const response = await personalmessageApi(
        localStorage.getItem("token"),
        selectedConversationId,
        inputMessage,
        loggedinUserDetails.uid
      );

      if (response.isSuccess) {
        const newMessage = {
          text: inputMessage,
          sender_id: loggedinUserDetails.uid,
          conversationId: selectedConversationId,
        };
        setMessages((prev) => {
          prev[selectedConversationId].messages.push(newMessage);
          return prev;
        });

        console.log("Non-Socket part");
        setInputMessage("");
      } else {
        console.log(
          "Error occurred while sending message:",
          response.errorMessage
        );
      }
    }
  };

  function emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!socketInstance) {
        reject("No socket connection.");
      } else {
        socketInstance.emit(event, data, (response) => {
          if (response.error) {
            console.error(response.error);
            reject(response.error);
          } else {
            resolve(response);
          }
        });
      }
    });
  }

  const updateMessages = (ide, obj) => {
    setMessages((prev) => {
      prev[ide].messages.push(obj);
      return prev;
    });
  };

  useEffect(() => {
    const socket = io("https://ping-ul-arnab-backend.loca.lt", {
      path: "/live",
      auth: {
        token: token,
      },
      // transports: ["websocket"],
      // upgrade: false,
    });

    console.log(socket);

    socket.on("connect", () => {
      console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
      setSocketInstance(socket);
    });

    socket.on("disconnect", () => {
      console.log("disconnect:", socket.id); // undefined
    });

    socket.on("server-messages", (data) => {
      //console.log("server-messages", JSON.parse(data)); // undefined
      const obj = JSON.parse(data);
      const ide = obj.conversation_group_id;
      console.log("Ide:", ide);
      console.log("Server-message:", obj);
      updateMessages(ide, obj);
    });
  }, []);

  return (
    <CentralState.Provider
      value={{
        selectedUser,
        setSelectedUSer,
        selectedConversationId,
        setSelectedConversationId,
        conversations,
        setConversations,
        messages,
        setMessages,
        inputMessage,
        setInputMessage,
        isConversationsFetched,
        setIsConversationFetched,
        handleSendMessage,
      }}
    >
      {children}
    </CentralState.Provider>
  );
};

export default CentralState;
