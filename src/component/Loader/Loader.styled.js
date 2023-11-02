import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const Backdrop = styled(Box)(() => ({
  background: "rgba(0, 0, 0, 0.3)",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  zIndex: "10",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SpinnerHolder = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  height: "60px",
  width: "120px",
  display: "block",
  zIndex: "199",
}));

export const Dot = styled("span")(() => ({
  backgroundColor: "white",
  display: "inline-block",
  height: "20px",
  margin: "10px",
  width: "20px",
  animation: "dot ease-in-out 1s infinite",
  "&:nth-of-type(2)": {
    animationDelay: "0.2s",
  },
  "&:nth-of-type(3)": {
    animationDelay: "0.3s",
  },

  "@keyframes dot": {
    "0%": {
      backgroundColor: "white",
      transform: "scale(1)",
    },
    "50%": {
      backgroundColor: "#ADD8E6",
      transform: "scale(1.3)",
    },
    "100%": {
      backgroundColor: "white",
      transform: "scale(1)",
    },
  },
}));
