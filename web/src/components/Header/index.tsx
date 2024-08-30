import { Box, Container, Flex, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pocketbase from "../../../../pocketbase";
import classes from "./index.module.css";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 48em)");

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

  // const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);

  return (
    <Box className={classes.header}>
      <Container className={classes.mainSection}>
        {/* <Drawer opened={drawerOpened} onClose={toggleDrawer} title={"Menu"} size="xs">
          <Link to="/gallery" style={{ textDecoration: "none", color: "black" }} onClick={toggleDrawer}>
            <NavLink label="Gallery" leftSection={<IconPhoto size="1rem" stroke={1.5} />} />
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "black" }} onClick={toggleDrawer}>
            <NavLink label="Contact" leftSection={<IconPhone size="1rem" stroke={1.5} />} />
          </Link>
        </Drawer> */}
        <Flex align="center" direction={isMobile ? "column" : "row"} justify="space-between">
          <Flex w="100%" align="center">
            {/* <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" maw={"28px"} mr="sm" hiddenFrom="sm" /> */}
            <Link to={"/"} style={{ display: "flex", justifyContent: "center", marginLeft: "6px" }}>
              {/* <Image src={"/images/full_logo.svg"} mih={60} mah={70} h="7vh" w={"auto"} style={{ pointerEvents: "none" }} /> */}
              <p>Shorl</p>
            </Link>
          </Flex>

          <Image
            src={pocketbase.getFileUrl(pocketbase.authStore.model, pocketbase.authStore.model.avatar)}
            fallbackSrc="/no_avatar.png"
            w="auto"
            h="7vh"
            style={{ cursor: "pointer" }}
          />
        </Flex>
      </Container>
    </Box>
  );
}
