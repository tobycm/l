import { Notifications } from "@mantine/notifications";
import { ClientResponseError } from "pocketbase";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";
import Constants from "../lib/constants";
import Maintenance from "../pages/Maintenance";
import Footer from "./Footer";
import Header from "./Header";

export default function Content() {
  const [page, setPage] = useState(
    <>
      <Notifications limit={5} />
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </>
  );

  useEffect(() => {
    fetch(`${Constants.PocketBaseURL}/api`)
      .then((res) => {
        if (res.status !== 200) setPage(<Maintenance error={{ status: res.status, error: "Unknown" }} />);
      })
      .catch((error) => {
        const betterError =
          error instanceof ClientResponseError ? { status: error.status, error: error.originalError } : { status: 999, error: new Error(error) };

        setPage(<Maintenance error={betterError} />);
      });
  }, []);

  return page;
}
