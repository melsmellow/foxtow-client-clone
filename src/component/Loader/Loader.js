"use client";
import { Backdrop, Dot, SpinnerHolder } from "./Loader.styled";

const Loader = () => {
  return (
    <Backdrop>
      <SpinnerHolder>
        <Dot />
        <Dot />
        <Dot />
      </SpinnerHolder>
    </Backdrop>
  );
};

export default Loader;
