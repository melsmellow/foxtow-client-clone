"use client";
import "../styles/style.css";
import Fonts from "@/styles/Fonts";
import { Providers } from "./provider";
import Header from "@/component/layout/Header";
import React from "react";
import { Loader } from "@/component/Loader";
import useCommonStore from "@/hooks/common/commonStore";

export default function RootLayout({ children }) {
  const { showLoader } = useCommonStore();
  return (
    <html lang="en">
      <body>
        <Providers>
          <Fonts />
          {showLoader === true ? <Loader /> : null}
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
