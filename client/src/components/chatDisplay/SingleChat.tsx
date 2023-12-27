import { useEffect, useState } from "react";
import { Message } from "../../types";
import { getMessageList } from "../../api";
import { useUserContext } from "../../context";
import { Box, useToast } from "@chakra-ui/react";

type SingleChatProps = {
  chatId: string;
};

const SingleChat = ({ chatId }: SingleChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUserContext();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (!user._id) {
        return;
      }
      try {
        const data = await getMessageList(chatId, user.token);
        setMessages(data);
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
  }, [chatId, toast, user]);

  return <Box maxW="100%">{JSON.stringify(messages, null, 2)}</Box>;
};

export default SingleChat;
