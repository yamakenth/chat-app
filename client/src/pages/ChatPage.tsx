import { Text } from "@chakra-ui/react";
import { useChatContext } from "../context/ChatProvider";

const ChatPage = () => {
  const { user } = useChatContext();
  return (
    <>
      <Text>ChatPage</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </>
  );
};

export default ChatPage;
