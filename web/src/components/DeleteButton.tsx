import { Button, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import pocketbase from "../../../pocketbase";
import { PBLink } from "../../../pocketbase/models";

export default function DeleteButton({ link }: { link: PBLink }) {
  const queryClient = useQueryClient();

  const user = pocketbase.authStore.model;

  const cant = !user.permissions.includes("delete") && user?.id !== link.ownerId;

  const button = (
    <Button
      px={"xs"}
      bg="red"
      key={link.id}
      disabled={cant}
      onClick={async () => {
        try {
          // if (import.meta.env.DEV) throw new ClientResponseError("lmao");
          await pocketbase.collection("links").delete(link.id);
          await queryClient.invalidateQueries({ queryKey: ["links"] });
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
    </Button>
  );

  return cant ? (
    <Tooltip label="Missing permissions" position="left">
      {button}
    </Tooltip>
  ) : (
    button
  );
}
