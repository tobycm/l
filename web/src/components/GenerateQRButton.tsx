import { Button, Flex, Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQrcode } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import pocketbase from "../../../pocketbase";
import { PBLink } from "../../../pocketbase/models";

import { QRCodeSVG } from "qrcode.react";

export default function QRButton({ link }: { link: PBLink }) {
  const [openModal, modalControls] = useDisclosure();

  const shortLinkBase = useQuery({
    queryKey: ["short-link-base"],
    queryFn: async () => {
      return await pocketbase.collection("metadata").getFirstListItem(`key = "short-link-base"`);
    },
  });

  const body = !shortLinkBase.isFetched ? (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Loader />
    </Flex>
  ) : (
    <QRCodeSVG value={`${shortLinkBase.data?.value ?? "http://localhost:3000"}${link.slug}`} />
  );

  return (
    <>
      <Modal opened={openModal} onClose={modalControls.close} title={`${link.slug} short link QR`}>
        {body}
      </Modal>

      <Button onClick={modalControls.open}>
        <IconQrcode />
      </Button>
    </>
  );
}
