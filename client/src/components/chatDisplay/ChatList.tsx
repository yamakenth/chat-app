import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const ChatList = () => {
  return (
    <Box w="100%" h="100%" display="flex" flexDir="column" gap={3}>
      <FormControl>
        <InputGroup>
          <Input placeholder="Search by name" />
          <InputRightElement>
            <Button variant="ghost">
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Box flex={1} bg="gray.50" borderRadius="lg" overflowY="hidden"></Box>
    </Box>
  );
};

export default ChatList;
