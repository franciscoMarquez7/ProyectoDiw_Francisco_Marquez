import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProviderComponent } from "./context/ThemeContext.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ListadoCiudades from "./components/ListadoCiudades";
import ListadoMonumentos from "./components/ListadoMonumentos";
import ModificarCiudad from "./components/ModificarCiudad";
import AltaCiudad from "./components/AltaCiudad";
import PaginaError from "./pages/PaginaError";
import AltaMonumento from "./components/AltaMonumento";
import ModificarMonumento from "./components/ModificarMonumento";
import ListadoCiudadesFiltrado from "./components/ListadoCiudadesFiltrado";
import ListadoMonumentosFiltrado from "./components/ListadoMonumentosFiltrado";


let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PaginaError />,
    children: [
      {
        path: "listadociudadesfiltrado",
        element: <ListadoCiudadesFiltrado />,
      },
      {
        path: "listadomonumentosfiltrado",
        element: <ListadoMonumentosFiltrado />,
      },
      {
        path: "listadociudades",
        element: <ListadoCiudades />,
      },
      {
        path: "listadomonumentos",
        element: <ListadoMonumentos />,
      },
      {
        path: "altaciudad",
        element: <AltaCiudad />,
      },
      {
        path: "altamonumento",
        element: <AltaMonumento />,
      },
      {
        path: "modificarciudad/:idciudad",
        element: <ModificarCiudad />,
      },
      {
        path: "modificarmonumento/:idmonumento",
        element: <ModificarMonumento />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProviderComponent>
    <RouterProvider router={router} />
  </ThemeProviderComponent>
);
