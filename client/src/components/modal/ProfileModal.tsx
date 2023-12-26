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
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api";
import { useUserContext } from "../../context";
import { EMPTY_USER } from "../../types";

type ProfileModalProps = {
  children?: ReactNode;
};

const ProfileModal = ({ children }: ProfileModalProps) => {
  const { user, setUser } = useUserContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleAccountDeletion = async () => {
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
              <Button
                colorScheme="red"
                onClick={handleAccountDeletion}
                w="100%"
              >
                Delete Account
              </Button>
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
