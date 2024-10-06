import { Alert, Button, Flex, PasswordInput, Text, TextInput, Title } from "@mantine/core";

import { isNotEmpty, useForm } from "@mantine/form";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router-dom";
import pocketbase from "../lib/database";

export default function LoginForm({ setAlert }: { setAlert: (alert: ReturnType<typeof Alert>) => void }) {
  const guestCredentials = {
    username: "public",
    password: "public",
  };

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Username is required"),
      password: isNotEmpty("Password is required"),
    },
  });

  return (
    <Flex direction="column" justify="center" miw="30%" w="auto">
      <Title order={1}>Login</Title>
      <Flex
        component="form"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore lmao eslint ồn thật
        onSubmit={form.onSubmit(async (values) => {
          try {
            await pocketbase.collection("users").authWithPassword(values.username, values.password);
            navigate("/");
          } catch (error) {
            if (error instanceof ClientResponseError)
              setAlert(
                <Alert color="red" title="Error" onClose={() => setAlert(undefined)}>
                  {error.message}
                </Alert>
              );
          }
        })}
      >
        <Flex mt="xl" direction="column">
          <TextInput label="Username" placeholder="Enter your username" required key={form.key("username")} {...form.getInputProps("username")} />
          <PasswordInput
            mt="sm"
            label="Password"
            placeholder="Enter your password"
            required
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Flex mt="xl">
            <Button color="cyan" type="submit">
              Sign in
            </Button>
          </Flex>

          <Text my="md">or</Text>

          <Button
            color="yellow"
            onClick={async () => {
              try {
                await pocketbase.collection("users").authWithPassword(guestCredentials.username, guestCredentials.password);
                navigate("/");
              } catch (error) {
                if (error instanceof ClientResponseError)
                  setAlert(
                    <Alert color="red" title="Error" onClose={() => setAlert(undefined)}>
                      Guest account is not available
                    </Alert>
                  );
              }
            }}
          >
            Continue as guest
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
