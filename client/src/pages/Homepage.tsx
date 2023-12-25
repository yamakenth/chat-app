import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Login, SignUp } from "../components";

const Homepage = () => (
  <Container bg="gray.100" minH="100vh" minW="100vw">
    <Container centerContent maxW="xl">
      <Box
        bg="white"
        border="2px"
        borderColor="gray.200"
        borderRadius="lg"
        display="flex"
        justifyContent="center"
        m="40px 0 15px 0"
        p={3}
        w="100%"
      >
        <Heading as="h1" size="xl">
          <ChatIcon color="teal" />
          &nbsp;&nbsp;Chat App
        </Heading>
      </Box>
      <Box
        bg="white"
        border="2px"
        borderColor="gray.200"
        borderRadius="lg"
        p={4}
        w="100%"
      >
        <Tabs colorScheme="teal">
          <TabList>
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  </Container>
);

export default Homepage;
