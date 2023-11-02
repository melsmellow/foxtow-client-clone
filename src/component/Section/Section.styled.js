import styled from "@emotion/styled";
import { Box, BoxProps } from "@chakra-ui/react";

export const SectionTitle = styled("legend")(() => ({
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "-0.96px",
  // backgroundColor: theme.background.grayBg,
  // border: `3px solid ${theme.background.grayBg}`,
  marginLeft: "1.5rem",
  padding: "0 .5rem",
}));

export const BodyContainer = styled(Box)(() => ({
  margin: "10px 36px 20px 36px",
}));

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  minHeight: "200px",
  border: `solid 1px ${theme.colors.gray[400]}`,
  borderRadius: "8px",
  position: "relative",
  marginBottom: ".5rem",
}));
