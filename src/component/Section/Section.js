import React, { ReactNode } from "react";
import {
  BodyContainer,
  SectionTitle,
  StyledBoxContainer,
} from "./Section.styled";

const Section = ({ title, children }) => {
  return (
    <StyledBoxContainer as={"fieldset"}>
      <SectionTitle>{title}</SectionTitle>
      <BodyContainer>{children}</BodyContainer>
    </StyledBoxContainer>
  );
};

export default Section;
