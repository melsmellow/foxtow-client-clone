"use client";
import { ChakraProvider } from "@chakra-ui/react";
import Themes from "../styles/Themes";

export const Providers = ({ children }) => {
  return <ChakraProvider theme={Themes}>{children}</ChakraProvider>;
};
