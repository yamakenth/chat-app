import { Container } from "@chakra-ui/react";
import { Navbar } from "../components/navigation";

const ChatPage = () => {
  return (
    <Container bg="gray.100" minH="100vh" minW="100vw" p={0}>
      <Navbar />
    </Container>
  );
};

export default ChatPage;
