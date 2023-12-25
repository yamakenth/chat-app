import { Box, BoxProps } from "@chakra-ui/react";

type ChatBoxProps = BoxProps & {};

const ChatBox = ({ ...props }: ChatBoxProps) => {
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
      ChatBox
    </Box>
  );
};

export default ChatBox;
