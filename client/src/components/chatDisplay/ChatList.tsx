import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import ChatDisplay from "./ChatDisplay";
import { Chat } from "../../types";
import { ChatLoading } from "../loading";

type ChatListProps = {
  chats: Chat[];
  selectedChat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
};

const ChatList = ({ chats, selectedChat, setSelectedChat }: ChatListProps) => {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDir="column"
      gap={3}
      overflow="hidden"
    >
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
      {chats.length > 0 ? (
        <VStack flex={1} bg="gray.100" borderRadius="lg" p={2}>
          {chats.map((chat) => (
            <ChatDisplay
              chat={chat}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              key={chat._id}
            />
          ))}
        </VStack>
      ) : (
        <ChatLoading />
      )}
    </Box>
  );
};

export default ChatList;
