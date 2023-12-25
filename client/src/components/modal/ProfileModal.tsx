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
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { useUserContext } from "../../context/UserProvider";

type ProfileModalProps = {
  children?: ReactNode;
};

const ProfileModal = ({ children }: ProfileModalProps) => {
  const { user } = useUserContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

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
            <Button colorScheme="teal" onClick={onClose} w="100%">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
