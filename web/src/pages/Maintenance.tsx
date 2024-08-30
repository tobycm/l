import { Flex, Text, Title } from "@mantine/core";

export default function Maintenance({ error }: { error?: { status: number; error: Error | string } }) {
  return (
    <Flex direction="column" align="center" justify="center" style={{ height: "100vh" }}>
      <Title order={1}>Maintainance</Title>
      <Text>Sorry, we are currently under maintainance. Please come back later. So sowwy, X3</Text>
      {error && (
        <Text>
          Error: {error.status} {error.error instanceof Error ? error.error.message : error.error}
        </Text>
      )}
    </Flex>
  );
}
