import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { Chat } from "@types";
import { Dispatch, SetStateAction } from "react";
import { NewChatModal } from "../modal";

type NewChatProps = {
  chats: Chat[];
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
};

const NewChat = ({ chats, setSelectedChat }: NewChatProps) => {
  return (
    <Box
      pb={3}
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="2xl">My Chats</Text>
      <NewChatModal chats={chats} setSelectedChat={setSelectedChat}>
        <Button
          type="button"
          colorScheme="teal"
          variant="solid"
          display="flex"
          fontSize="md"
          rightIcon={<EditIcon />}
        >
          New Chat
        </Button>
      </NewChatModal>
    </Box>
  );
};

export default NewChat;
