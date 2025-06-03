import { Box } from "@chakra-ui/react";
import React from "react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar.jsx";
import { useColorModeValue } from "./components/ui/color-mode";

// Routing functionality
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} minH={"100vh"}>
      {/* Navbar */}
      <Navbar />
      {/* Routes like HomePage & CreatePage */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
