import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { ChatBox, MyChats, Navbar } from "../components";
import { EMPTY_CHAT } from "../types";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(EMPTY_CHAT);

  return (
    <Container
      display="flex"
      flexDir="column"
      bg="gray.100"
      minH="100vh"
      minW="100vw"
      p={0}
    >
      <Navbar />
      <Container
        flex={1}
        display="flex"
        justifyContent="space-between"
        gap={3}
        maxW="container.lg"
        py={3}
      >
        <MyChats
          display={{ base: selectedChat._id ? "none" : "flex", md: "flex" }}
          flex={{ base: 1, md: 1 }}
        />
        <ChatBox
          display={{ base: selectedChat._id ? "flex" : "none", md: "flex" }}
          flex={{ base: 1, md: 2 }}
        />
      </Container>
    </Container>
  );
};

export default ChatPage;
