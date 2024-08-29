import { Box, Flex, Text, Title } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconMail, IconPhone } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";

export default function Footer() {
  return (
    <>
      <Box className={classes.footer}>
        <Box className={classes.information}>
          <Title order={4} fw={600} mb={15}>
            Contact us
          </Title>
          <Flex align="center" mb={10}>
            <IconPhone className={classes.icon} />
            <Text ml={5} c="#485665">
              Hotline:{" "}
              <Link to="tel:911" style={{ color: "#485665", textDecoration: "none" }}>
                911
              </Link>
            </Text>
          </Flex>
          <Flex align="center" mb={10}>
            <IconMail className={classes.icon} />
            <Text ml={5} c="#485665">
              Email:{" "}
              <Link to="mailto:iotran207@cht.edu.vn" style={{ color: "#485665", textDecoration: "none" }}>
                iotran207@cht.edu.vn
              </Link>
            </Text>
          </Flex>
        </Box>
        <Box className={classes.information}>
          <Title order={4} fw={600} mb={15}>
            Connect with us!
          </Title>
          <Flex align="center">
            <Link to="https://www.facebook.com/" target="_blank" style={{ marginRight: "20px" }}>
              <IconBrandFacebook style={{ color: "#485665" }} size={30} />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank" style={{ marginRight: "20px" }}>
              <IconBrandInstagram style={{ color: "#485665" }} size={30} />
            </Link>
          </Flex>
        </Box>
      </Box>
      <Box className={classes.innerFooter}>
        <Text pt="lg" pb="lg" c="#485665">
          Copyright © 2021-{new Date().getFullYear()} <strong>Short Linker.</strong> All rights reserved.
        </Text>
      </Box>
    </>
  );
}
