import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { Chat } from "@types";
import { NewChatModal } from "../modal";

type NewChatProps = {
  chats: Chat[];
};

const NewChat = ({ chats }: NewChatProps) => {
  return (
    <Box
      pb={3}
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="2xl">My Chats</Text>
      <NewChatModal chats={chats}>
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
