import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/ChatProvider";
import { EMPTY_USER } from "../../types";

const Navbar = () => {
  const { user, setUser } = useChatContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(EMPTY_USER);
    navigate("/");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="5px 10px"
      w="100%"
      bg="white"
      borderBottom="2px"
      borderColor="gray.200"
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
            <MenuItem>MyProfile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
