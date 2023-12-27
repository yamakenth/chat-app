import { Skeleton, Stack } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <Stack bg="gray.100" borderRadius="lg" p={2} minH="100%">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} height="60px" borderRadius="lg" />
      ))}
    </Stack>
  );
};

export default ChatLoading;
