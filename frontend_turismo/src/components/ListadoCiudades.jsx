import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoCiudades() {
  const [rows, setRows] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getCiudad() {
      let response = await fetch(apiUrl + "/ciudades", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getCiudad();
  }, []);

  const handleDelete = async (id) => {
    let response = await fetch(apiUrl + "/ciudades/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      const ciudadesTrasBorrado = rows.filter((ciudad) => ciudad.id !== id);
      setRows(ciudadesTrasBorrado);
    }
  };

  const handleSearchById = async () => {
    if (!searchId) {
      alert("Por favor, ingresa un ID válido.");
      return;
    }

    let response = await fetch(apiUrl + "/ciudades/" + searchId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let data = await response.json();
      setRows([data.datos]); // Muestra solo la ciudad encontrada
    } else {
      alert("Ciudad no encontrada.");
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de ciudades
      </Typography>

      {/* Buscador de Ciudad por ID */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          label="Buscar por ID"
          variant="outlined"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearchById}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDCIUDAD</TableCell>
                <TableCell align="right">NOMBRE</TableCell>
                <TableCell align="right">PAIS</TableCell>
                <TableCell align="right">POBLACION</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.pais}</TableCell>
                  <TableCell align="right">{row.poblacion}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarciudad/" + row.id)}
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoCiudades;
