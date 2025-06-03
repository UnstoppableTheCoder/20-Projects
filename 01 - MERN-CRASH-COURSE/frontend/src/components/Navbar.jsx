import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  // It's from chakra-ui
  // colorMode gets changed when toggleColorMode is clicked and invoked
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spaceX={2} spaceY={2} alignItems={"center"}>
          <Flex gap={2}>
            <Link to={"/create"}>
              <Button>
                <CiSquarePlus fontSize={20} />
              </Button>
            </Link>

            {/* Changing the theme */}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun />}
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
