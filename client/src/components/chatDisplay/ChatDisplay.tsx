import { Box, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "../../context";
import { Chat } from "../../types";

type ChatProps = {
  chat: Chat;
  selectedChat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
};

const ChatDisplay = ({ chat, selectedChat, setSelectedChat }: ChatProps) => {
  const { user } = useUserContext();
  const chatName = chat.users?.filter((u) => u._id !== user._id)?.[0].name;

  return (
    <Box
      onClick={() => setSelectedChat(chat)}
      cursor="pointer"
      bg={selectedChat === chat ? "teal" : "white"}
      color={selectedChat === chat ? "white" : "black"}
      px={3}
      py={2}
      borderRadius="lg"
      w="100%"
    >
      <Text fontSize="md" align="left">
        {chatName}
      </Text>
      {chat.latestMessage && (
        <Text fontSize="xs" align="left">
          <b>{chat.latestMessage.sender?.name}</b>
          {chat.latestMessage.content?.length ?? 0 > 50
            ? chat.latestMessage.content?.substring(0, 51) + "..."
            : chat.latestMessage.content}
        </Text>
      )}
    </Box>
  );
};

export default ChatDisplay;
