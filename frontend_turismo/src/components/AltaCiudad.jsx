/**
 * @module AltaCiudad
 * @description Componente que maneja el formulario de alta de una nueva ciudad
 * @requires react
 * @requires @mui/material
 * @requires react-router-dom
 */
import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

/**
 * @function AltaCiudad
 * @description Renderiza un formulario para crear una nueva ciudad
 * @returns {JSX.Element} Formulario de alta de ciudad
 */
function AltaCiudad() {
  // Estado para los datos del formulario
  const [datos, setDatos] = useState({
    nombre: "",
    pais: "",
    poblacion: "",
  });

  // Estado para manejar los mensajes de error de validación
  const [errores, setErrores] = useState({
    nombre: "",
    pais: "",
    poblacion: "",
  });

  const navigate = useNavigate();

  /**
   * @function handleSubmit
   * @description Maneja el envío del formulario, valida los datos y hace la petición POST
   * @param {Event} e - Evento del formulario
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validaciones antes de enviar
    let erroresTemp = { nombre: "", pais: "", poblacion: "" };
    let hayErrores = false;

    if (!datos.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio.";
      hayErrores = true;
    }
    if (!datos.pais.trim()) {
      erroresTemp.pais = "El país es obligatorio.";
      hayErrores = true;
    }
    if (
      !datos.poblacion.trim() ||
      isNaN(datos.poblacion) ||
      Number(datos.poblacion) <= 0
    ) {
      erroresTemp.poblacion = "La población debe ser un número positivo.";
      hayErrores = true;
    }

    setErrores(erroresTemp);

    if (hayErrores) return; // Si hay errores, no enviamos los datos

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

  /**
   * @function handleChange
   * @description Actualiza el estado del formulario cuando cambian los inputs
   * @param {Event} e - Evento del input
   */
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });

    // Limpiar error si el usuario comienza a escribir
    setErrores({
      ...errores,
      [e.target.name]: "",
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
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              error={!!errores.nombre}
              helperText={errores.nombre}
            />
            <TextField
              label="País"
              variant="outlined"
              name="pais"
              value={datos.pais}
              onChange={handleChange}
              error={!!errores.pais}
              helperText={errores.pais}
            />
            <TextField
              label="Población"
              variant="outlined"
              name="poblacion"
              value={datos.poblacion}
              onChange={handleChange}
              error={!!errores.poblacion}
              helperText={errores.poblacion}
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
