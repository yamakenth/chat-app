import { Avatar, Box, Text } from "@chakra-ui/react";
import { User } from "@types";

type UserListItemProps = {
  user: User;
  handleClick?: () => void;
  isSelectedUser?: boolean;
};

const UserListItem = ({
  user,
  handleClick,
  isSelectedUser = false,
}: UserListItemProps) => {
  return (
    <Box
      w="100%"
      h="58px"
      bg={isSelectedUser ? "teal.400" : "gray.100"}
      cursor="pointer"
      _hover={{ background: "teal.400", color: "white" }}
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      borderRadius="lg"
      onClick={handleClick}
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={user.name} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email:&nbsp;</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
