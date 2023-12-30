import {
  Avatar,
  Box,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import {
  Chat,
  Message,
  WsClientToServerEvents,
  WsServerToClientEvents,
} from "@types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Socket } from "socket.io-client";
import animationData from "../../animations/typing.json";
import { getMessageList } from "../../api";
import { useUserContext } from "../../context";

type SingleChatProps = {
  chatId: string;
  socket: Socket<WsServerToClientEvents, WsClientToServerEvents>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setIsSocketConnected: Dispatch<SetStateAction<boolean>>;
  notifications: Chat[];
  setNotifications: Dispatch<SetStateAction<Chat[]>>;
};

let selectedChatIdCompare: string | undefined;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  renderSettings: { preserveAspectRatio: "xMidYMid slice" },
};

let prevChatId = "";

const SingleChat = ({
  chatId,
  socket,
  messages,
  setMessages,
  setIsSocketConnected,
  notifications,
  setNotifications,
}: SingleChatProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useUserContext();
  const toast = useToast();

  useEffect(() => {
    if (!user._id) {
      return;
    }
    socket.emit("setup", user._id);
    socket.on("connected", () => setIsSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stoppedTyping", () => setIsTyping(false));
  }, [socket, setIsSocketConnected, user]);

  useEffect(() => {
    socket.emit("leaveChat", prevChatId);
    prevChatId = chatId;
  }, [socket, chatId]);

  useEffect(() => {
    (async () => {
      if (!user._id) {
        return;
      }
      setIsLoading(true);
      try {
        const data = await getMessageList(chatId, user.token);
        setMessages(data);
        socket.emit("joinChat", chatId);
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

    selectedChatIdCompare = chatId;
  }, [chatId, setMessages, socket, toast, user]);

  useEffect(() => {
    socket.on("messageReceived", (newMessageReceived) => {
      if (
        selectedChatIdCompare &&
        selectedChatIdCompare === newMessageReceived.chat?._id
      ) {
        setMessages([...messages, newMessageReceived]);
      } else if (!notifications.includes(newMessageReceived)) {
        const { chat } = newMessageReceived;
        if (!chat) {
          return;
        }
        setNotifications([chat, ...notifications]);
      }
    });
  });

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
            {isTyping && (
              <Box>
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
