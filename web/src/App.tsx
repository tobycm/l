import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Content from "./components/Content";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Content />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <MantineProvider
      theme={{
        fontFamily: "Ubuntu, sans-serif",
        headings: { fontFamily: "Ubuntu, sans-serif" },
        colors: {},
        breakpoints: {
          mn: "471px",
        },
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
