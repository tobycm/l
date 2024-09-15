import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShare2 } from "@tabler/icons-react";
import { PBLink } from "../../../pocketbase/models";

import { QRCodeSVG } from "qrcode.react";

export default function ShareButton({ link }: { link: PBLink }) {
  const [openModal, modalControls] = useDisclosure();

  const fullLink = `${import.meta.env.VITE_BACKEND_API_URL ?? "http://localhost:3000"}${link.slug}`;

  return (
    <>
      <Modal opened={openModal} onClose={modalControls.close} title={`${link.slug} short link info`}>
        <Text mb={"lg"}>
          Full link:{" "}
          <a href={fullLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "" }}>
            {fullLink}
          </a>
        </Text>

        <QRCodeSVG value={fullLink} />
      </Modal>

      <Button px={"xs"} onClick={modalControls.open}>
        <IconShare2 />
      </Button>
    </>
  );
}
