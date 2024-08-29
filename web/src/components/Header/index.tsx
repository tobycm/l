import { Box, Burger, Container, Drawer, Flex, NavLink } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPhone, IconPhoto } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 48em)");

  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);

  return (
    <Box className={classes.header}>
      <Container className={classes.mainSection}>
        <Drawer opened={drawerOpened} onClose={toggleDrawer} title={"Menu"} size="xs">
          <Link to="/gallery" style={{ textDecoration: "none", color: "black" }} onClick={toggleDrawer}>
            <NavLink label="Gallery" leftSection={<IconPhoto size="1rem" stroke={1.5} />} />
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "black" }} onClick={toggleDrawer}>
            <NavLink label="Contact" leftSection={<IconPhone size="1rem" stroke={1.5} />} />
          </Link>
        </Drawer>
        <Flex align="center" direction={isMobile ? "column" : "row"} justify="space-between">
          <Flex w={"100%"} align="center">
            <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" maw={"28px"} mr="sm" hiddenFrom="sm" />
            <Link to={"/"} style={{ display: "flex", justifyContent: "center", marginLeft: "6px" }}>
              {/* <Image src={"/images/full_logo.svg"} mih={60} mah={70} h="7vh" w={"auto"} style={{ pointerEvents: "none" }} /> */}
              <p>nhăm nhăm</p>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
