import { Box, BoxProps } from "@chakra-ui/react";

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
      MyChats
    </Box>
  );
};

export default MyChats;
