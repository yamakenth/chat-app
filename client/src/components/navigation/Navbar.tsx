import { BellIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Chat } from "@types";
import { Dispatch, SetStateAction } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { useNavigate } from "react-router-dom";
import { EMPTY_USER } from "../../constants";
import { useUserContext } from "../../context";
import { ProfileModal } from "../modal";

type NavbarProps = {
  setSelectedChat: Dispatch<SetStateAction<Chat>>;
  notifications: Chat[];
  setNotifications: Dispatch<SetStateAction<Chat[]>>;
};

const Navbar = ({
  setSelectedChat,
  notifications,
  setNotifications,
}: NavbarProps) => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(EMPTY_USER);
    navigate("/");
  };

  return (
    <Box w="100%" bg="white" borderBottom="2px" borderColor="gray.200">
      <Container
        maxW="container.lg"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p="5px 10px"
      >
        <Heading as="h1" size="lg">
          <ChatIcon color="teal" />
          &nbsp;&nbsp;Chat App
        </Heading>
        <Box>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notifications.length && "No New Messages"}
              {notifications.map((chatNotification) => (
                <MenuItem
                  key={chatNotification._id}
                  onClick={() => {
                    setSelectedChat(chatNotification);
                    setNotifications(
                      notifications.filter((n) => n !== chatNotification)
                    );
                  }}
                >
                  {`New Message from ${JSON.stringify(
                    chatNotification.users?.filter(
                      (u) => u.name !== user.name
                    )[0].name
                  )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
            >
              <Avatar cursor="pointer" name={user.name} size="sm" />
            </MenuButton>
            <MenuList fontSize="md">
              <ProfileModal user={user} setUser={setUser}>
                <MenuItem>MyProfile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout} color="red.500">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
