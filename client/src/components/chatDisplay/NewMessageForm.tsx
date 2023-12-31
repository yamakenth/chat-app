import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import {
  Message,
  WsClientToServerEvents,
  WsServerToClientEvents,
} from "@types";
import { FormikErrors, useFormik } from "formik";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Socket } from "socket.io-client";
import { promptChatbotToRespond, sendMessage } from "../../api";
import { useUserContext } from "../../context";

const TYPING_TIMER_LENGTH_IN_MS = 3_000;

type FormValues = {
  newMessage: string;
};

const validate = (values: FormValues) => {
  const { newMessage } = values;
  const errors: FormikErrors<FormValues> = {};
  if (!newMessage || newMessage.length === 0) {
    errors.newMessage = "Message cannot be empty";
  }
  return errors;
};

type newMessageFormProps = {
  chatId: string;
  socket: Socket<WsServerToClientEvents, WsClientToServerEvents>;
  isChatbotChat: boolean;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  isSocketConnected: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
};

const NewMessageForm = ({
  chatId,
  socket,
  isChatbotChat,
  messages,
  setMessages,
  isSocketConnected,
  setIsTyping,
}: newMessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = useToast();

  let typing = false;

  const formik = useFormik({
    initialValues: { newMessage: "" },
    validate,
    onSubmit: async (values) => {
      socket.emit("stoppedTyping", chatId);
      setIsLoading(true);
      try {
        const data = await sendMessage(chatId, values.newMessage, user.token);
        formik.setFieldValue("newMessage", "");
        setMessages([...messages, data]);
        socket.emit("newMessage", data);
        if (isChatbotChat) {
          setIsTyping(true);
          const response = await promptChatbotToRespond(chatId, user.token);
          setIsTyping(false);
          setMessages([...messages, data, response]);
        }
      } catch (error) {
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "Error Occurred!",
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    if (!isSocketConnected) {
      return;
    }

    if (!typing) {
      typing = true;
      socket.emit("typing", chatId);
    }

    const lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= TYPING_TIMER_LENGTH_IN_MS && typing) {
        socket.emit("stoppedTyping", chatId);
        typing = false;
      }
    }, TYPING_TIMER_LENGTH_IN_MS);
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <FormControl
        isRequired
        isInvalid={formik.touched.newMessage && !!formik.errors.newMessage}
      >
        <InputGroup>
          <Input
            name="newMessage"
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newMessage}
            type="text"
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
              isLoading={isLoading}
              aria-label="Submit message"
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default NewMessageForm;
