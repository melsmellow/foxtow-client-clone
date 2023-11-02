"use client";
import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
@font-face{
    font-family: 'OpenSans';
    src: url('fonts/OpenSans-Black.ttf');
    font-style:normal;
    font-weight: 400;
    font-display:swap;
}`}
  />
);

export default Fonts;
