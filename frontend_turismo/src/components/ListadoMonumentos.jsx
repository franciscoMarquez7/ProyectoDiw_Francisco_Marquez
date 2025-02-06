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

function ListadoMonumentos() {
  const [rows, setRows] = useState([]);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [monumentoFiltrado, setMonumentoFiltrado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMonumentos() {
      let response = await fetch(apiUrl + "/monumentos", {
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

    getMonumentos();
  }, []);

  const handleDelete = async (id) => {
    let response = await fetch(apiUrl + "/monumentos/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      const monumentosTrasBorrado = rows.filter((monumento) => monumento.id !== id);
      setRows(monumentosTrasBorrado);
      setMonumentoFiltrado(null);
    }
  };

  const handleSearch = async () => {
    if (!idBusqueda.trim()) {
      setMonumentoFiltrado(null);
      return;
    }

    let response = await fetch(apiUrl + "/monumentos/" + idBusqueda, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      let data = await response.json();
      setMonumentoFiltrado(data.datos);
    } else {
      setMonumentoFiltrado(null);
      alert("No se encontró un monumento con ese ID.");
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de Monumentos
      </Typography>

      {/*  Campo de búsqueda por ID */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          label="Buscar por ID"
          variant="outlined"
          size="small"
          value={idBusqueda}
          onChange={(e) => setIdBusqueda(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDMONUMENTO</TableCell>
                <TableCell align="right">NOMBRE</TableCell>
                <TableCell align="right">IDCIUDAD</TableCell>
                <TableCell align="right">AÑOCONSTRUCCION</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monumentoFiltrado ? (
                <TableRow key={monumentoFiltrado.id}>
                  <TableCell align="right">{monumentoFiltrado.id}</TableCell>
                  <TableCell align="right">{monumentoFiltrado.nombre}</TableCell>
                  <TableCell align="right">{monumentoFiltrado.ciudad_id}</TableCell>
                  <TableCell align="right">{monumentoFiltrado.añoConstruccion}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => handleDelete(monumentoFiltrado.id)} color="error">
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => navigate("/modificarmonumento/" + monumentoFiltrado.id)}>
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.nombre}</TableCell>
                    <TableCell align="right">{row.ciudad_id}</TableCell>
                    <TableCell align="right">{row.añoConstruccion}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" onClick={() => handleDelete(row.id)} color="error">
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" onClick={() => navigate("/modificarmonumento/" + row.id)}>
                        <EditNoteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoMonumentos;
