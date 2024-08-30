import { Button, Flex, Loader, rgba, ScrollArea, Table, TableData, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconExclamationCircle, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { ClientResponseError } from "pocketbase";
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
    head: ["Edit", "Slug", "URL", "Owner", "Created", "Updated", "Delete"],
    body: links.data.map((link) => [
      <Button>
        <IconEdit />
      </Button>,
      link.slug,
      link.url,
      link.expand.owner.name ?? link.expand.owner.username ?? link.expand.owner.email,
      new Date(link.created).toLocaleDateString(),
      new Date(link.updated).toLocaleDateString(),
      <Button
        bg="red"
        onClick={async () => {
          try {
            // if (import.meta.env.DEV) throw new ClientResponseError("lmao");
            await pocketbase.collection("links").delete(link.id);
          } catch (error) {
            if (!(error instanceof ClientResponseError)) return console.error(error);

            notifications.show({
              title: `Failed to delete short link ${link.slug}`,
              message: `Error: ${error.originalError}`,
              autoClose: 10000,
              color: "red",
              icon: <IconExclamationCircle />,
            });
          }
        }}
      >
        <IconTrash />
      </Button>,
    ]),
  };

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <Title order={2}>Welcome to Shorl, {user.name ?? user.username ?? user.email}!</Title>

      <ScrollArea m="xl" offsetScrollbars={"y"} type="always" h="55vh" w="85%">
        <Table
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
