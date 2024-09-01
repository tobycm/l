import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQrcode } from "@tabler/icons-react";
import { PBLink } from "../../../pocketbase/models";

import { QRCodeSVG } from "qrcode.react";

export default function QRButton({ link }: { link: PBLink }) {
  const [openModal, modalControls] = useDisclosure();

  return (
    <>
      <Modal opened={openModal} onClose={modalControls.close} title={`${link.slug} short link QR`}>
        <QRCodeSVG value={`${import.meta.env.VITE_BACKEND_API_URL ?? "http://localhost:3000"}${link.slug}`} />
      </Modal>

      <Button onClick={modalControls.open}>
        <IconQrcode />
      </Button>
    </>
  );
}
