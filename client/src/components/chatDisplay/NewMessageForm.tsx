import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const NewMessageForm = () => {
  return (
    <form>
      <FormControl isRequired>
        <InputGroup>
          <Input
            variant="filled"
            bg="gray.200"
            borderRadius="2xl"
            placeholder="Enter a message..."
          />
          <InputRightElement>
            <IconButton
              variant="solid"
              bg="teal"
              borderRadius="50%"
              size="sm"
              icon={<ArrowUpIcon color="white" />}
              aria-label="Submit message"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default NewMessageForm;
