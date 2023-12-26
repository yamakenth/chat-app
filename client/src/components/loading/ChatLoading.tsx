import { Skeleton, Stack } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <Stack bg="gray.100" borderRadius="lg" p={2}>
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} height="60px" borderRadius="lg" />
      ))}
    </Stack>
  );
};

export default ChatLoading;
