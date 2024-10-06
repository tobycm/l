import { Flex, Loader, rgba, ScrollArea, Table, TableData, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { User } from "../../../pocketbase/models";
import CreateButton from "../components/CreateButton";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import ShareButton from "../components/ShareButton";
import pocketbase from "../lib/database";
import { toTitleCase } from "../lib/utils";

export default function Home() {
  const links = useQuery({
    queryKey: ["links"],
    queryFn: async () => (await pocketbase.collection("links").getList(0, 20, { expand: "owner" })).items,
    initialData: [],
  });

  const [user, setUser] = useState(pocketbase.authStore.model);

  useEffect(() => pocketbase.authStore.onChange((_, model) => setUser(model as User)), []);

  useEffect(() => {
    if (user) return;

    links.refetch();
  }, [user]);

  if (!links.isFetched)
    return (
      <Flex w="100%" h="100%" direction="column" justify="center" align="center">
        <Loader />
      </Flex>
    );

  const data: TableData = {
    head: ["Edit", "Slug", "URL", "Owner", "Privacy", "Created", "Updated", "Share", "Delete"],
    body: links.data.map((link) => [
      <EditButton link={link} key={link.id} />,
      link.slug,
      link.url,
      link.expand.owner.name || link.expand.owner.username || link.expand.owner.email,
      toTitleCase(link.privacy || "Public"),
      new Date(link.created).toLocaleDateString(),
      new Date(link.updated).toLocaleDateString(),
      <ShareButton link={link} key={link.id} />,
      <DeleteButton link={link} key={link.id} />,
    ]),
  };

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <Title order={2}>Welcome to Shorl, {user.name || user.username || user.email}!</Title>

      {user.permissions.includes("create") && <CreateButton />}

      <ScrollArea mt="3vh" mb="3vh" ml="2vw" mr="2vw" offsetScrollbars={"y"} type="always" h="55vh">
        {data.body?.length ? (
          <Table
            data={data}
            stickyHeader
            // striped
            withTableBorder
            withColumnBorders
            styles={{ table: { background: rgba("#FFFFFF", 0.5) }, tr: {} }}
          />
        ) : null}
      </ScrollArea>
    </Flex>
  );
}
