import {
  Avatar,
  Box,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMessageList } from "../../api";
import { useUserContext } from "../../context";
import { Message } from "../../types";

type SingleChatProps = {
  chatId: string;
};

const SingleChat = ({ chatId }: SingleChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (!user._id) {
        return;
      }
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    })();
  }, [chatId, toast, user]);

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
      ) : (
        <Box
          flex={1}
          display="flex"
          flexDir="column-reverse"
          overflowY="scroll"
        >
          <Box mb={3}>
            {messages.length === 0 ? (
              <Text fontSize="md" color="gray.700" mb={3}>
                No messages to show
              </Text>
            ) : (
              messages.map((m) => (
                <Box
                  display="flex"
                  flexDir={m.sender?._id !== user._id ? "row" : "row-reverse"}
                  justifyContent="space-between"
                  gap={1}
                  key={m._id}
                >
                  <Tooltip
                    label={m.sender?.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender?.name}
                    />
                  </Tooltip>
                  <Box
                    bg={m.sender?._id === user._id ? "#bee3f8" : "#b9f5d0"}
                    p="10px 20px"
                    borderRadius="20px"
                    maxW="75%"
                    ml={m.sender?._id === user._id ? "auto" : "0"}
                    mr={m.sender?._id === user._id ? "0" : "auto"}
                    mb={2}
                  >
                    <Text fontSize="md" textAlign="left">
                      {m.content}
                    </Text>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
