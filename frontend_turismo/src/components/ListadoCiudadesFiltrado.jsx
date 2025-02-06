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

function ListadoCiudadesFiltrado() {
  const [rows, setRows] = useState([]);
  const [pais, setPais] = useState("");

  useEffect(() => {
    fetchCiudades();
  }, []);

  const fetchCiudades = async () => {
    let response = await fetch(`${apiUrl}/ciudades`);
    if (response.ok) {
      let data = await response.json();
      setRows(data.datos);
    }
  };

  const handleSearch = async () => {
    if (!pais.trim()) {
      alert("Ingresa un país para buscar.");
      return;
    }

    let response = await fetch(`${apiUrl}/ciudades/filtro/pais?pais=${pais}`);
    if (response.ok) {
      let data = await response.json();
      setRows(data.datos);
    } else {
      alert("No se encontraron ciudades en ese país.");
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de ciudades por país
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          label="Filtrar por país"
          variant="outlined"
          size="small"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
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
                <TableCell align="right">País</TableCell>
                <TableCell align="right">Población</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.pais}</TableCell>
                  <TableCell align="right">{row.poblacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoCiudadesFiltrado;
