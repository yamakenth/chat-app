import { Box, BoxProps } from "@chakra-ui/react";
import { Chat } from "@types";
import { Dispatch, SetStateAction } from "react";
import ChatList from "./ChatList";
import ChatSearch from "./ChatSearch";

type MyChatsProps = BoxProps & {
  chats: Chat[];
  selectedChat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
};

const MyChats = ({
  chats,
  selectedChat,
  setSelectedChat,
  ...props
}: MyChatsProps) => {
  return (
    <Box
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      overflowY="hidden"
      {...props}
    >
      <ChatSearch />
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </Box>
  );
};

export default MyChats;
