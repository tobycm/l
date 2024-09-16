import { Divider, Flex, Loader, Title } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import pocketbase from "../../../pocketbase";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Login() {
  const isMobile = useMediaQuery("(max-width: 40em)");

  const registerOk = useQuery({
    queryKey: ["registerOk"],
    queryFn: async () => {
      try {
        await pocketbase.collection("users").create({});
      } catch (error) {
        return error instanceof ClientResponseError && error.status === 400;
      }

      return false;
    },
  });

  if (!registerOk.isFetched)
    return (
      <Flex w="100vw" h="100vh">
        <Flex justify="center" align="center" m="auto" direction="column">
          <Title order={1}>Loading...</Title>
          <Loader mt="lg" />
        </Flex>
      </Flex>
    );

  return (
    <Flex {...(isMobile ? { w: "90vw", mt: "lg" } : { w: "80vw", h: "100vh" })} mx="auto" align="center">
      <Flex direction={isMobile ? "column" : "row"} w="100%" maw="48rem" mx="auto" justify="space-between" align={isMobile ? "center" : "start"}>
        <LoginForm />

        {registerOk.data ? (
          <Divider
            size="sm"
            {...(isMobile ? { w: "60%", my: "lg" } : { h: "50vh", my: "auto" })}
            orientation={isMobile ? "horizontal" : "vertical"}
          />
        ) : null}

        {registerOk.data ? <RegisterForm /> : null}
      </Flex>
    </Flex>
  );
}
