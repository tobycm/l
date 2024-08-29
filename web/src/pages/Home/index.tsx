import { Flex, Loader, rgba, ScrollArea, Table, TableData, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import pocketbase from "../../lib/database";

export default function Home() {
  const links = useQuery({
    queryKey: ["links"],
    queryFn: async () => (await pocketbase.collection("links").getList(0, 20, { expand: "owner" })).items,
    initialData: [],
  });

  const user = pocketbase.authStore.model;

  if (links.isLoading)
    return (
      <Flex w="100%" h="100%" direction="column" justify="center" align="center">
        <Loader />
      </Flex>
    );

  const data: TableData = {
    head: ["Slug", "URL", "Owner"],
    body: links.data.map((link) => [link.slug, link.url, link.expand.owner.name ?? link.expand.owner.username ?? link.expand.owner.email]),
  };

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <Title order={2}>Welcome to Shorl, {user.name ?? user.username ?? user.email}!</Title>

      <ScrollArea m="xl" offsetScrollbars={"y"} type="always" h="55vh">
        <Table
          w={"80vw"}
          data={data}
          stickyHeader
          // striped
          withTableBorder
          withColumnBorders
          styles={{ table: { background: rgba("#FFFFFF", 0.5) }, tr: {} }}
        />
      </ScrollArea>
    </Flex>
  );
}
