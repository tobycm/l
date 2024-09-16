import { Button, Flex, Modal, Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCirclePlus, IconDeviceFloppy, IconExclamationCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import pocketbase from "../../../pocketbase";

export default function CreateButton() {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      slug: "",
      url: "",
      privacy: "",
    },
    validate: {
      slug: isNotEmpty("Slug is required"),
      url: isNotEmpty("URL is required"),
    },
  });

  const [openModal, modalControls] = useDisclosure();

  return (
    <>
      <Modal opened={openModal} onClose={modalControls.close} title={`Creating a new short link`}>
        <Flex
          component="form"
          direction={"column"}
          align="end"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore lmao eslint
          onSubmit={form.onSubmit(async (values) => {
            try {
              if (!values.slug.startsWith("/")) values.slug = `/${values.slug}`;
              await pocketbase.collection("links").create({ ...values, owner: pocketbase.authStore.model.id });
              await queryClient.invalidateQueries({ queryKey: ["links"] });
            } catch (error) {
              if (!(error instanceof ClientResponseError)) return console.error(error);

              notifications.show({
                title: `Failed to create short link ${values.slug}`,
                message: `Error: ${error.name}`,
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
          <Select
            label="Privacy"
            w="100%"
            mt={"md"}
            data={["public", "unlisted"]}
            placeholder="public"
            required
            key={form.key("privacy")}
            {...form.getInputProps("privacy")}
          />
          <Button type="submit" mt={"md"} leftSection={<IconDeviceFloppy />}>
            Save
          </Button>
        </Flex>
      </Modal>

      <Button mt={"md"} onClick={modalControls.open} leftSection={<IconCirclePlus />}>
        Create a new short link
      </Button>
    </>
  );
}
