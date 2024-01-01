import {
  Avatar,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { User } from "@types";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api";
import { EMPTY_USER } from "../../constants";

type ProfileModalProps = {
  user: User;
  setUser?: Dispatch<SetStateAction<User>>;
  children?: ReactNode;
};

const ProfileModal = ({ user, setUser, children }: ProfileModalProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const isAccountDeletionDisabled = () => {
    return user.email === "guest@example.com";
  };

  const handleAccountDeletion = async () => {
    if (!setUser) {
      return;
    }
    onClose();
    if (window.confirm("Are you sure you'd like to delete your account?")) {
      try {
        await deleteUser(user._id, user.token);
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "success",
          title: "Account Deletion Successful",
        });
        localStorage.removeItem("userInfo");
        setUser(EMPTY_USER);
        navigate("/");
      } catch (error) {
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "Error Occurred!",
          description: (error as Error).message,
        });
      }
    }
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          aria-label="button"
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" fontSize="2xl" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            alignItems="center"
            display="flex"
            flexDir="column"
            gap={6}
            justifyContent="space-between"
          >
            <Avatar name={user.name} size="2xl" />
            <Text>
              <b>Email:</b>&nbsp;{user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <VStack w="100%">
              {setUser && (
                <Button
                  colorScheme="red"
                  onClick={handleAccountDeletion}
                  w="100%"
                  isDisabled={isAccountDeletionDisabled()}
                >
                  Delete Account
                </Button>
              )}
              <Button colorScheme="teal" onClick={onClose} w="100%">
                Close
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
