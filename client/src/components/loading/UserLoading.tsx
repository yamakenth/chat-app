import { Skeleton } from "@chakra-ui/react";

const UserLoading = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} height="58px" w="100%" borderRadius="lg" />
      ))}
    </>
  );
};

export default UserLoading;
