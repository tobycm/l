import { Alert, Button, Flex, PasswordInput, Space, TextInput, Title } from "@mantine/core";

import { isNotEmpty, useForm } from "@mantine/form";
import { ClientResponseError } from "pocketbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pocketbase from "../lib/database";

export default function Login() {
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

  const [alert, setAlert] = useState<ReturnType<typeof Alert>>();

  return (
    <Flex w="100vw" h="100vh" direction="column" justify="center" align="center">
      <Flex direction="column" justify="center" miw="40%">
        {alert}
        {alert && <Space h="xl" />}

        <Title order={1}>Login</Title>
        <Flex
          component="form"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore lmao eslint ồn thật
          onSubmit={form.onSubmit(async (values) => {
            try {
              await pocketbase.collection("users").authWithPassword(values.username, values.password);
            } catch (error) {
              if (error instanceof ClientResponseError)
                setAlert(
                  <Alert color="red" title="Error" onClose={() => setAlert(undefined)}>
                    {error.message}
                  </Alert>
                );
            }

            navigate("/");
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
