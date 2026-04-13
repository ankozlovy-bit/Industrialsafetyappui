import { RouterProvider, createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Wizard } from "./pages/Wizard";
import { DocumentGenerator } from "./pages/DocumentGenerator";
import { TechnicalAlbum } from "./pages/TechnicalAlbum";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "wizard", element: <Wizard /> },
      { path: "document", element: <DocumentGenerator /> },
      { path: "album", element: <TechnicalAlbum /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}