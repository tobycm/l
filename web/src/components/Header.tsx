import { Flex, Image } from "@mantine/core";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pocketbase from "../../../pocketbase";

import logo from "/MATHEOS.svg";
import noAvatar from "/no_avatar.png";

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/login") return;
    // console.log(window.location.pathname);

    pocketbase
      .collection("users")
      .authRefresh({ requestKey: null })
      .catch(() => {
        // not logged in
        navigate("/login");
      });
  }, []);

  return (
    <Flex pt="3vh" mb="3vh" h="7vh" ml="1vw" mr="1vw" align="center" justify="space-between">
      <Link to={"/"} style={{ display: "flex", justifyContent: "center" }}>
        <Image src={logo} w="auto" h="7vh" />
      </Link>

      <Image
        src={pocketbase.authStore.model ? pocketbase.getFileUrl(pocketbase.authStore.model, pocketbase.authStore.model.avatar) : noAvatar}
        w="auto"
        h="7vh"
        style={{ cursor: "pointer" }}
        onClick={() => {
          pocketbase.authStore.clear();
          navigate("/login");
        }}
      />
    </Flex>
  );
}
