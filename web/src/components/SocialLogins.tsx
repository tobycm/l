import { Button, Flex, Loader, Text, Title } from "@mantine/core";
import { IconBrandDiscord, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import pocketbase from "../../../pocketbase";

const providerIcons = {
  google: <IconBrandGoogle />,
  github: <IconBrandGithub />,
  discord: <IconBrandDiscord />,
};

export default function SocialLogins() {
  const authMethods = useQuery({
    queryKey: ["authMethods"],
    queryFn: async () => (await pocketbase.collection("users").listAuthMethods()).authProviders,
    initialData: [],
  });

  if (!authMethods.isFetched)
    return (
      <Flex direction="column">
        <Text>Loading...</Text>
        <Loader />
      </Flex>
    );

  if (authMethods.data.length === 0) return;

  return (
    <Flex direction="column">
      <Title order={1}>Or sign in with</Title>
      {authMethods.data.map((authMethod) => (
        <Button
          key={authMethod.name}
          leftSection={providerIcons[authMethod.name as keyof typeof providerIcons]}
          onClick={() => pocketbase.collection("users").authWithOAuth2({ provider: "google" })}
          color="blue"
          fullWidth
          mt="sm"
        >
          {authMethod.displayName}
        </Button>
      ))}
    </Flex>
  );
}
