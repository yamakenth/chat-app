import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import { promptChatbotToRespond, sendMessage } from "../../api";
import { useUserContext } from "../../context";

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
};

const NewMessageForm = ({ chatId }: newMessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = useToast();

  const formik = useFormik({
    initialValues: { newMessage: "" },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await sendMessage(chatId, values.newMessage, user.token);
        formik.setFieldValue("newMessage", "");
        await promptChatbotToRespond(chatId, user.token);
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

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <FormControl
        isRequired
        isInvalid={formik.touched.newMessage && !!formik.errors.newMessage}
      >
        <InputGroup>
          <Input
            name="newMessage"
            onChange={formik.handleChange}
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
