import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { ChatPage, Homepage } from "./pages";

const App = () => {
  return (
    <Box minHeight="100vh" textAlign="center" fontSize="xl">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </Box>
  );
};

export default App;
