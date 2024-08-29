import { Box, Text } from "@mantine/core";
import classes from "./index.module.css";

export default function Footer() {
  return (
    <Box className={classes.innerFooter}>
      <Text pt="lg" pb="lg" c="#485665">
        Copyright © 2024-{new Date().getFullYear()} <strong>Shorl</strong> All rights reserved. | toby@vsus.app and iotran207@cht.edu.vn
      </Text>
    </Box>
  );
}
