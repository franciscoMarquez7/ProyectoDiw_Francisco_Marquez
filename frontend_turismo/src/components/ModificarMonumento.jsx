import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

function ModificarMonumento() {
  const params = useParams();
  const [datos, setDatos] = useState({
    id: params.idmonumento,
    nombre: "",
    ciudad_id: "",
    añoConstruccion: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false, // true si hay error
    ciudad_id: false,
    añoConstruccion: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getMonumentoById() {
      let response = await fetch(apiUrl + "/monumentos/" + datos.id);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getMonumentoById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(apiUrl + "/monumentos/" + datos.id, {
          method: "PUT", // "PATCH"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos), // JSON.stringify({blocked: true})
        });

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found ciudad no modificada o no encontrada
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      nombre: false,
      ciudad_id: false,
      añoConstruccion: false,
    };

    if (datos.nombre.length < 3) {
      // Error en el nombre
      validacionAux.nombre = true;
      // Formulario invalido
      validado = false;
    }

    if (datos.ciudad_id.length < 1) {
      validacionAux.ciudad_id = true;
      validado = false;
    }

    if (datos.añoConstruccion < 1) {
      validacionAux.añoConstruccion = true;
      validado = false;
    }

    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar Monumento
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
              error={validacion.nombre}
              helperText={
                validacion.nombre && "Nombre incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="IDCiudad"
              variant="outlined"
              name="ciudad_id"
              value={datos.ciudad_id}
              onChange={handleChange}
              error={validacion.ciudad_id}
              helperText={
                validacion.ciudad_id &&
                "ID Ciudad incorrecto. Mínimo 1 carácter"
              }
            />
            <TextField
              id="outlined-basic"
              label="Año de Construcción"
              variant="outlined"
              name="añoConstruccion"
              value={datos.añoConstruccion}
              onChange={handleChange}
              error={validacion.añoConstruccion}
              helperText={
                validacion.añoConstruccion &&
                "Año incorrecto. Debe ser mayor a 0"
              }
            />
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarMonumento;
