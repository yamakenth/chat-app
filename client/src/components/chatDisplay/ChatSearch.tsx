import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";

const ChatSearch = () => {
  return (
    <Box
      pb={3}
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="2xl">My Chats</Text>
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
    </Box>
  );
};

export default ChatSearch;
