import { BackgroundImage } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import bg from "/bg.png";

export default function Content() {
  const [page, setPage] = useState(
    <>
      <ScrollRestoration />
      <Header />
      <BackgroundImage src={bg} bgr="repeat" bgsz={"auto"}>
        <Outlet />
      </BackgroundImage>
      <Footer />
    </>
  );

  return page;
}
