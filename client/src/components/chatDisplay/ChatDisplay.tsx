import { Box, Text } from "@chakra-ui/react";
import { Chat } from "@types";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "../../context";
import { formattedLatestMessageContent } from "../../utils";

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
          <b>{chat.latestMessage.sender?.name}:&nbsp;</b>
          {formattedLatestMessageContent(chat.latestMessage.content || "")}
        </Text>
      )}
    </Box>
  );
};

export default ChatDisplay;
