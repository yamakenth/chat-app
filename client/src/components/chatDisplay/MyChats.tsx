import { Box, BoxProps } from "@chakra-ui/react";
import ChatSearch from "./ChatSearch";
import ChatList from "./ChatList";

type MyChatsProps = BoxProps & {};

const MyChats = ({ ...props }: MyChatsProps) => {
  return (
    <Box
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      {...props}
    >
      <ChatSearch />
      <ChatList />
    </Box>
  );
};

export default MyChats;
