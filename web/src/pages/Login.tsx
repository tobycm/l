import { Flex, TextInput } from "@mantine/core";

import { isNotEmpty, useForm } from "@mantine/form";

export default function Login() {
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
    <Flex>
      <h1>Login</h1>
      <Flex
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextInput m="lg" label="Username" placeholder="Enter your username" required {...form.getInputProps("username")} />
      </Flex>
    </Flex>
  );
}
