import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from "../config";

function AltaCiudad() {
  const [datos, setDatos] = useState({
    nombre: "",
    pais: "",
    poblacion: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      const response = await fetch(apiUrl + "/ciudades", {
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

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta Ciudad
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
              label="Pais"
              variant="outlined"
              name="pais"
              value={datos.pais}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Poblacion"
              variant="outlined"
              name="poblacion"
              value={datos.poblacion}
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

export default AltaCiudad;
