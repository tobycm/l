import { Anchor, Button, Image, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShare2 } from "@tabler/icons-react";
import { PBLink } from "../../../pocketbase/models";

import { qrcode } from "@libs/qrcode";

export default function ShareButton({ link }: { link: PBLink }) {
  const [openModal, modalControls] = useDisclosure();

  const fullLink = `${import.meta.env.VITE_BACKEND_API_URL ?? "http://localhost:3000"}${link.slug}`;

  const qr = qrcode("https://example.com", { output: "svg" });

  return (
    <>
      <Modal opened={openModal} onClose={modalControls.close} title={`${link.slug} short link info`}>
        <Text mb={"lg"}>
          Full link:{" "}
          <a href={fullLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "" }}>
            {fullLink}
          </a>
        </Text>

        <Image
          src={`data:image/png;base64,${Buffer.from(qr).toString("base64")}`}
          alt={`QR Code for ${fullLink}`}
          width={200}
          height={200}
          mb={"lg"}
        />

        <Anchor
          href={`${import.meta.env.VITE_QR_CODE_WEB ?? "https://qr.tobycm.dev"}/?data=${encodeURIComponent(fullLink)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to customize your QR code
        </Anchor>
      </Modal>

      <Button px="xs" onClick={modalControls.open}>
        <IconShare2 />
      </Button>
    </>
  );
}
