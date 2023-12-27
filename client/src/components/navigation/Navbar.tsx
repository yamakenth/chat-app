import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";
import { ProfileModal } from "../modal";
import { EMPTY_USER } from "../../types";

const Navbar = () => {
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
