import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconEdit, IconExclamationCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ClientResponseError, RecordModel } from "pocketbase";
import pocketbase from "../lib/database";
import { Link } from "../lib/database/models";

export default function EditButton({ link }: { link: Link & RecordModel }) {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      slug: link.slug,
      url: link.url,
    },
    validate: {
      slug: isNotEmpty("Slug is required"),
      url: isNotEmpty("URL is required"),
    },
  });

  const [openModal, modalControls] = useDisclosure();

  return (
    <>
      <Modal opened={openModal} onClose={modalControls.close} title={`Editing ${link.slug} short link`}>
        <Flex
          component="form"
          direction={"column"}
          align="end"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore lmao eslint
          onSubmit={form.onSubmit(async (values) => {
            try {
              await pocketbase.collection("links").update(link.id, values);
              await queryClient.invalidateQueries({ queryKey: ["links"] });
            } catch (error) {
              if (!(error instanceof ClientResponseError)) return console.error(error);

              notifications.show({
                title: `Failed to update short link ${link.slug}`,
                message: `Error: ${error.originalError}`,
                autoClose: 10000,
                color: "red",
                icon: <IconExclamationCircle />,
              });
            }
            modalControls.close();
          })}
        >
          <TextInput label="Slug" w="100%" placeholder="Enter your slug" required key={form.key("slug")} {...form.getInputProps("slug")} />
          <TextInput label="URL" w="100%" mt={"md"} placeholder="Enter your URL" required key={form.key("url")} {...form.getInputProps("url")} />
          <Button type="submit" mt={"md"} leftSection={<IconDeviceFloppy />}>
            Save
          </Button>
        </Flex>
      </Modal>

      <Button onClick={modalControls.open}>
        <IconEdit />
      </Button>
    </>
  );
}
