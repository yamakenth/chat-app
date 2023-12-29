import { Container, useToast } from "@chakra-ui/react";
import { Chat } from "@types";
import { useEffect, useState } from "react";
import { getChatList } from "../api";
import { ChatBox, MyChats, Navbar } from "../components";
import { EMPTY_CHAT } from "../constants";
import { useUserContext } from "../context";
import { sortChatListByMostRecent } from "../utils";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(EMPTY_CHAT);
  const [notifications, setNotifications] = useState<Chat[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useUserContext();
  const toast = useToast();

  useEffect(() => {
    if (!user._id) {
      return;
    }
    (async () => {
      try {
        const data: Chat[] = await getChatList(user.token);
        sortChatListByMostRecent(data);
        setChats(data);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: (error as Error).message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    })();
  }, [toast, user]);

  return (
    <Container
      display="flex"
      flexDir="column"
      bg="gray.200"
      maxW="100vw"
      h="100%"
      p={0}
    >
      <Navbar
        setSelectedChat={setSelectedChat}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <Container
        flex={1}
        display="flex"
        justifyContent="space-between"
        gap={3}
        maxW="container.lg"
        maxH="92vh"
        py={3}
      >
        <MyChats
          chats={chats}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          display={{ base: selectedChat._id ? "none" : "flex", md: "flex" }}
          flex={{ base: 1, md: 1 }}
          maxW="100%"
        />
        <ChatBox
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          notifications={notifications}
          setNotifications={setNotifications}
          display={{ base: selectedChat._id ? "flex" : "none", md: "flex" }}
          flex={{ base: 1, md: 2 }}
          maxW="100%"
        />
      </Container>
    </Container>
  );
};

export default ChatPage;
