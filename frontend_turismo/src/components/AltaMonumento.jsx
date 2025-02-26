/**
 * @module AltaMonumento
 * @description Componente que maneja el formulario de alta de un nuevo monumento
 * @requires react
 * @requires @mui/material
 * @requires react-router-dom
 */

import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from "../config";

/**
 * @function AltaMonumento
 * @description Renderiza un formulario para crear un nuevo monumento
 * @returns {JSX.Element} Formulario de alta de monumento
 */
function AltaMonumento() {
  // Estado para los datos del formulario
  const [datos, setDatos] = useState({
    nombre: "",
    ciudad_id: "",
    añoConstruccion: "",
  });

  const navigate = useNavigate();

  /**
   * @function handleSubmit
   * @description Procesa el envío del formulario y realiza la petición POST
   * @param {Event} e - Evento del formulario
   * @async
   */
  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      const response = await fetch(apiUrl + "/monumentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/"); // Volver a la página principal
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  };

  /**
   * @function handleChange
   * @description Actualiza el estado cuando cambian los inputs
   * @param {Event} e - Evento del input
   */
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta Monumento
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Ciudad_ID"
              variant="outlined"
              name="ciudad_id"
              value={datos.ciudad_id}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="AñoConstruccion"
              variant="outlined"
              name="añoConstruccion"
              value={datos.añoConstruccion}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AltaMonumento;
