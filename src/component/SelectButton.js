import { Icon, Button } from "@chakra-ui/react";
import React from "react";
import { AiFillCheckCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";

const CustomButton = styled(Button)(({ theme }) => ({
  transition: "0.15s",
  transitionTimingFunction: "ease",
}));

function SelectButton({ isSelected, children, ...props }) {
  return (
    <CustomButton
      colorScheme="facebook"
      variant={isSelected ? "solid" : "outline"}
      leftIcon={
        isSelected ? (
          <Icon as={AiFillCheckCircle} boxSize={5} />
        ) : (
          <Icon as={AiOutlineMinusCircle} boxSize={5} />
        )
      }
      {...props}
    >
      {children}
    </CustomButton>
  );
}

export default SelectButton;
