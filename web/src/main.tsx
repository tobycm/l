// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "@fontsource/ubuntu";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClientResponseError } from "pocketbase";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import pocketbase from "../../pocketbase";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

queryClient.fetchQuery({
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <App />
    </QueryClientProvider>
  </StrictMode>
);

console.log(pocketbase);
