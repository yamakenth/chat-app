import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Chat, User } from "@types";
import { useFormik } from "formik";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createChat, getUserList } from "../../api";
import { useUserContext } from "../../context";
import { EMPTY_USER } from "../../constants";
import { UserLoading } from "../loading";
import { UserListItem } from "../users";

type NewChatModalProps = {
  children?: ReactNode;
  chats: Chat[];
};

const NewChatModal = ({ children, chats }: NewChatModalProps) => {
  const { user } = useUserContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(EMPTY_USER);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingChatCreation, setIsLoadingChatCreation] = useState(false);
  const toast = useToast();

  const getUsers = useCallback(
    async (nameOrEmail?: string) => {
      setIsLoadingUsers(true);
      try {
        const data = await getUserList(nameOrEmail);
        setUsers(data);
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
        setIsLoadingUsers(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const formik = useFormik({
    initialValues: { nameOrEmail: "" },
    onSubmit: (values) => getUsers(values.nameOrEmail),
  });

  const handleChatCreation = async () => {
    setIsLoadingChatCreation(true);

    for (let chat of chats) {
      const userIds = chat.users?.map((user) => user._id);
      if (userIds?.includes(selectedUser._id)) {
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "You already have a chat with this user",
        });
        setIsLoadingChatCreation(false);
        return;
      }
    }

    try {
      await createChat(selectedUser._id, user.token);
      onClose();
      window.location.reload();
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
      setIsLoadingChatCreation(false);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" fontSize="2xl" justifyContent="center">
            Create New Chat
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            alignItems="center"
            display="flex"
            flexDir="column"
            gap={6}
            justifyContent="space-between"
          >
            <VStack w="100%">
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                style={{ width: "100%" }}
              >
                <FormControl>
                  <InputGroup>
                    <Input
                      name="nameOrEmail"
                      onChange={formik.handleChange}
                      value={formik.values.nameOrEmail}
                      type="text"
                    />
                    <InputRightElement>
                      <IconButton
                        bg="none"
                        color="gray.500"
                        type="submit"
                        variant="unstyled"
                        aria-label="Search users by name or email"
                        icon={<SearchIcon />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </form>
              <VStack w="100%" h={64 * 3} overflowY="hidden">
                <VStack w="100%" overflowY="auto">
                  {isLoadingUsers ? (
                    <UserLoading />
                  ) : (
                    users.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleClick={() => setSelectedUser(user)}
                        isSelectedUser={user._id === selectedUser._id}
                      />
                    ))
                  )}
                </VStack>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack w="100%">
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={handleChatCreation}
                w="100%"
                isLoading={isLoadingChatCreation}
                loadingText="Submitting"
              >
                Create Chat
              </Button>
              <Button
                type="button"
                colorScheme="teal"
                variant="outline"
                onClick={onClose}
                w="100%"
              >
                Close
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewChatModal;
