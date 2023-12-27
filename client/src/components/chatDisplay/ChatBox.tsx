import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, BoxProps, IconButton, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "../../context";
import NewMessageForm from "./NewMessageForm";
import { ProfileModal } from "../modal";
import SingleChat from "./SingleChat";
import { Chat, EMPTY_CHAT, EMPTY_USER } from "../../types";

type ChatBoxProps = BoxProps & {
  selectedChat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
};

const ChatBox = ({ selectedChat, setSelectedChat, ...props }: ChatBoxProps) => {
  const { user } = useUserContext();

  const sender =
    selectedChat.users?.filter((u) => u._id !== user._id)?.[0] || EMPTY_USER;

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
            <SingleChat chatId={selectedChat._id} />
            <NewMessageForm />
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
