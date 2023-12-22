import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api");
      const data = await res.json();
      setMessage(data.message);
    })();
  }, []);

  return (
    <ChakraProvider>
      <Box minHeight="100vh" textAlign="center" fontSize="xl">
        <Text>{message}</Text>
      </Box>
    </ChakraProvider>
  );
};

export default App;
