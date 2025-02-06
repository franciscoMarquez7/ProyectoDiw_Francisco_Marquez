import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { apiUrl } from "../config";

function ListadoMonumentosFiltrado() {
  const [rows, setRows] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetchMonumentos();
  }, []);

  const fetchMonumentos = async () => {
    let response = await fetch(`${apiUrl}/monumentos`);
    if (response.ok) {
      let data = await response.json();
      setRows(data.datos);
    }
  };

  const handleSearch = async () => {
    if (!nombre.trim()) {
      alert("Ingresa un nombre para buscar.");
      return;
    }

    try {
      let response = await fetch(`${apiUrl}/monumentos/filtro/nombre?nombre=${encodeURIComponent(nombre)}`);
      
      if (!response.ok) {
        alert("No se encontraron monumentos con ese nombre.");
        return;
      }

      let data = await response.json();
      console.log("Respuesta de la API:", data);

      setRows(data.datos);
    } catch (error) {
      console.error("Error al obtener los monumentos:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de Monumentos por Nombre
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          label="Filtrar por nombre"
          variant="outlined"
          size="small"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Ciudad ID</TableCell>
                <TableCell align="right">Año de Construcción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.ciudad_id}</TableCell>
                  <TableCell align="right">{row.añoConstruccion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoMonumentosFiltrado;
