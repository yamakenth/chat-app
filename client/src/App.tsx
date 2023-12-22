import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatPage, Homepage } from "./pages";

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
    <Box minHeight="100vh" textAlign="center" fontSize="xl">
      <Text>{message}</Text>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </Box>
  );
};

export default App;
