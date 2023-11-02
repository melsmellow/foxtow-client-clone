import {
  Flex,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import React from "react";
import { isEmpty } from "@/utils";
import {
  AsteriskContainer,
  ErrorText,
  ExtraLabelLeft,
  StyledInput,
  StyledInputContainer,
  StyledInputLabelBox,
  StyledInputLeftElement,
  StyledInputRightElement,
} from "./Input.styled";

const Input = ({
  labelType = "top",
  label,
  inputStyles,
  rightElement,
  leftElement,
  customLabel,
  errorStyles,
  errorMsg,
  isInvalid,
  extraLabel,
  rightAddon,
  leftAddon,
  width,
  reactFormHookRegister,
  ...inputProps
}) => {
  const hasLeftElement = !isEmpty(leftElement);
  const hasRightElement = !isEmpty(rightElement);
  const hasExtraLabel = !isEmpty(extraLabel);
  const hasRightAddon = !isEmpty(rightAddon);
  const hasLeftAddon = !isEmpty(leftAddon);

  return (
    <StyledInputContainer labelType={labelType} width={width}>
      {label ? (
        <StyledInputLabelBox labelType={labelType} style={inputStyles?.label}>
          {label}
          {inputProps.isRequired ? (
            <AsteriskContainer as="span">*</AsteriskContainer>
          ) : null}
        </StyledInputLabelBox>
      ) : null}
      {customLabel ? customLabel : null}
      <InputGroup
        height="35px"
        alignItems="flex-end"
        size={inputProps.size}
        variant={inputProps.variant}
      >
        {hasLeftAddon ? (
          <InputLeftAddon
            mt={isInvalid && errorMsg ? "18px" : "0px"}
            height={inputProps.height}
            style={{
              borderRadius: "8px 0px 0px 8px",
              ...inputStyles?.leftAddon,
            }}
          >
            {leftAddon}
          </InputLeftAddon>
        ) : null}
        {hasLeftElement ? (
          <StyledInputLeftElement
            height={inputProps.height}
            style={inputStyles?.leftElement}
          >
            {leftElement}
          </StyledInputLeftElement>
        ) : null}

        {hasExtraLabel ? <ExtraLabelLeft>{extraLabel}</ExtraLabelLeft> : null}
        <Flex
          flexDir="column"
          width="100%"
          position="relative"
          mt={isInvalid ? "0px" : "18px"}
        >
          {isInvalid && errorMsg && (
            <ErrorText {...errorStyles}>{errorMsg}</ErrorText>
          )}
          <StyledInput
            style={{
              borderTopLeftRadius: hasLeftAddon ? 0 : undefined,
              borderBottomLeftRadius: hasLeftAddon ? 0 : undefined,
              borderTopRightRadius: hasRightAddon ? 0 : undefined,
              borderBottomRightRadius: hasRightAddon ? 0 : undefined,
              ...inputStyles?.input,
            }}
            _placeholder={inputStyles?.placeholder}
            isInvalid={isInvalid}
            hasLeftElement={hasLeftElement}
            hasRightElement={hasRightElement}
            {...inputProps}
            {...reactFormHookRegister}
          />
          {hasRightElement ? (
            <StyledInputRightElement
              size={inputProps.size}
              style={inputStyles?.rightElement}
              position="absolute"
              top={isInvalid && errorMsg ? "18px" : "0px"}
            >
              {rightElement}
            </StyledInputRightElement>
          ) : null}
        </Flex>
        {hasRightElement ? (
          <StyledInputRightElement
            height={inputProps.height}
            style={inputStyles?.rightElement}
          >
            {rightElement}
          </StyledInputRightElement>
        ) : null}
        {hasRightAddon ? (
          <InputRightAddon
            mt={isInvalid && errorMsg ? "18px" : "0px"}
            height={inputProps.height}
            style={{
              borderRadius: "0px 8px 8px 0px",
              ...inputStyles?.rightAddon,
            }}
          >
            {rightAddon}
          </InputRightAddon>
        ) : null}
      </InputGroup>
    </StyledInputContainer>
  );
};

export default Input;
