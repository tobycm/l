import { Alert, Divider, Flex, Loader, Title } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import SocialLogins from "../components/SocialLogins";
import pocketbase from "../lib/database";

export default function Login() {
  const isMobile = useMediaQuery("(max-width: 40em)");

  const registerOk = useQuery({
    queryKey: ["registerOk"],
    queryFn: async () => {
      try {
        await pocketbase.collection("users").create({});
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore instanceof doesnt really work when built
        return error.status === 400;
      }

      return false;
    },
  });

  const authMethods = useQuery({
    queryKey: ["authMethods"],
    queryFn: async () => (await pocketbase.collection("users").listAuthMethods()).authProviders,
    initialData: [],
  });

  function setAlert(alert: ReturnType<typeof Alert>) {
    notifications.show({
      message: alert,
      color: "red",
      autoClose: 10000,
      icon: <IconExclamationCircle />,
    });
  }

  if (!registerOk.isFetched || !authMethods.isFetched)
    return (
      <Flex w="100vw" h="100vh">
        <Flex justify="center" align="center" m="auto" direction="column">
          <Title order={1}>Loading...</Title>
          <Loader mt="lg" />
        </Flex>
      </Flex>
    );

  const socialLogins = <SocialLogins />;

  return (
    <>
      <Notifications limit={5} />

      <Flex {...(isMobile ? { w: "90vw", mt: "lg" } : { w: "80vw", h: "100vh" })} mx="auto" align="center">
        <Flex direction={isMobile ? "column" : "row"} w="100%" maw="64rem" mx="auto" justify="space-between" align={isMobile ? "center" : "start"}>
          <LoginForm setAlert={setAlert} />

          {registerOk.data && (
            <Divider
              size="sm"
              {...(isMobile ? { w: "60%", my: "lg" } : { h: "50vh", my: "auto" })}
              orientation={isMobile ? "horizontal" : "vertical"}
            />
          )}

          {registerOk.data && <RegisterForm setAlert={setAlert} />}

          {authMethods.data.length !== 0 && (
            <Divider
              size="sm"
              {...(isMobile ? { w: "60%", my: "lg" } : { h: "50vh", my: "auto" })}
              orientation={isMobile ? "horizontal" : "vertical"}
            />
          )}
          {socialLogins}
        </Flex>
      </Flex>
    </>
  );
}
