import styled from "@emotion/styled";
import {
  Box,
  Input,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { shouldNotPassProps } from "@/utils";

export const StyledInputContainer = styled(
  Box,
  shouldNotPassProps(["labelType"])
)(({ labelType }) => ({
  display: "flex",
  flexDirection: labelType === "left" ? "row" : "column",
}));

export const AsteriskContainer = styled(
  Text,
  shouldNotPassProps(["theme"])
)(({ theme }) => ({
  color: theme.colors.red[600],
  marginLeft: "4px",
}));

export const ExtraLabelLeft = styled(
  Text,
  shouldNotPassProps(["theme"])
)(({ theme }) => ({
  color: theme.colors.black[500],
  margin: ".6rem 1.5rem .6rem .6rem",
}));
function getStylesForInputLabelBox(labelType) {
  switch (labelType) {
    case "left":
      return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "16px",
      };
    case "top":
    default:
      return {};
  }
}

export const StyledInputLabelBox = styled(
  Box,
  shouldNotPassProps(["theme", "labelType"])
)(({ theme, labelType }) => ({
  marginBottom: 0,
  padding: 0,
  fontWeight: "bold",
  lineHeight: "20px",
  fontSize: "13px",
  color: theme.colors.black,
  ...getStylesForInputLabelBox(labelType),
}));

export const StyledInputLeftElement = styled(InputLeftElement)(({ size }) => ({
  borderRadius: "8px 0px 0px 8px",
  paddingLeft: "16px",
  paddingRight: "16px",
  width: size == "sm" ? "44px" : "51px",
}));

export const StyledInputRightElement = styled(InputRightElement)(
  ({ size }) => ({
    paddingRight: size === "sm" ? "16px" : "20px",
    width: "auto",
  })
);

function getStyledInputPaddingLeft(props) {
  const { size, hasLeftElement } = props;
  switch (size) {
    case "sm":
      return hasLeftElement ? "60px" : "16px";
    case "md":
    default:
      return hasLeftElement ? "72px" : "20px";
  }
}

function getStyledInputPaddingRight(props) {
  const { size, hasRightElement } = props;
  switch (size) {
    case "sm":
      return hasRightElement ? "46px" : "16px";
    case "md":
    default:
      return hasRightElement ? "60px" : "20px";
  }
}

export const StyledInput = styled(
  Input,
  shouldNotPassProps(["hasRightElement", "hasLeftElement"])
)((props) => {
  return {
    paddingLeft: getStyledInputPaddingLeft(props),
    paddingRight: getStyledInputPaddingRight(props),
    "&::-webkit-calendar-picker-indicator": {
      // backgroundColor:"red"displa
      display: "none",
    },
  };
});

export const ErrorText = styled(Text)(({ theme }) => ({
  fontSize: 12,
  color: theme.colors.red[600],
  paddingLeft: 10,
}));
