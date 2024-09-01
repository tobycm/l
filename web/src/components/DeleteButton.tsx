import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import pocketbase from "../../../pocketbase";
import { PBLink } from "../../../pocketbase/models";

export default function DeleteButton({ link }: { link: PBLink }) {
  const queryClient = useQueryClient();

  return (
    <Button
      bg="red"
      key={link.id}
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
}
