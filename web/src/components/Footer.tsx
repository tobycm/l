import { Flex, Text } from "@mantine/core";

export default function Footer() {
  return (
    <Flex w="100%" justify="space-between" pt="2vh" pb="2vh" pl="7vw" pr="7vw" bg="#FFFFFF">
      <Text c="#485665">
        Copyright © 2024-{new Date().getFullYear()} <strong>Shorl</strong> All rights reserved. | toby@vsus.app and iotran207@cht.edu.vn
      </Text>
    </Flex>
  );
}
