import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, BoxProps, IconButton, Text } from "@chakra-ui/react";
import {
  Chat,
  Message,
  WsClientToServerEvents,
  WsServerToClientEvents,
} from "@types";
import { Dispatch, SetStateAction, useState } from "react";
import { io, Socket } from "socket.io-client";
import { EMPTY_CHAT, EMPTY_USER } from "../../constants";
import { useUserContext } from "../../context";
import NewMessageForm from "./NewMessageForm";
import { ProfileModal } from "../modal";
import SingleChat from "./SingleChat";

/* deployment: change endpoint to deployed url */
const SERVER_ENDPOINT = "https://chat-app-i9jv.onrender.com";

type ChatBoxProps = BoxProps & {
  selectedChat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
  notifications: Chat[];
  setNotifications: Dispatch<SetStateAction<Chat[]>>;
};

const socket: Socket<WsServerToClientEvents, WsClientToServerEvents> =
  io(SERVER_ENDPOINT);

const ChatBox = ({
  selectedChat,
  setSelectedChat,
  notifications,
  setNotifications,
  ...props
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useUserContext();

  const sender =
    selectedChat.users?.filter((u) => u._id !== user._id)?.[0] || EMPTY_USER;
  const isChatbotChat = !!selectedChat.users?.find(
    (u) => u.isChatbot === "true"
  );

  return (
    <Box
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      maxW="100%"
      {...props}
    >
      {selectedChat._id != null ? (
        <>
          <Box
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(EMPTY_CHAT)}
              aria-label="Back to chat view"
            />
            <Text fontSize="2xl">{sender.name}</Text>
            <ProfileModal user={sender} />
          </Box>
          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="gray.100"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            <SingleChat
              chatId={selectedChat._id}
              socket={socket}
              messages={messages}
              setMessages={setMessages}
              setIsSocketConnected={setIsSocketConnected}
              notifications={notifications}
              setNotifications={setNotifications}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
            <NewMessageForm
              chatId={selectedChat._id}
              socket={socket}
              isChatbotChat={isChatbotChat}
              messages={messages}
              setMessages={setMessages}
              isSocketConnected={isSocketConnected}
              setIsTyping={setIsTyping}
            />
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
