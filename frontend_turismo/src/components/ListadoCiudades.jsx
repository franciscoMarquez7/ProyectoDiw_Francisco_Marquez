import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

// 🎨 Colores para la gráfica
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
];

function ListadoCiudades() {
  const [rows, setRows] = useState([]);
  const [datosGrafica, setDatosGrafica] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCiudades() {
      let response = await fetch(apiUrl + "/ciudades", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
        setDatosGrafica(
          data.datos.map((ciudad) => ({
            nombre: ciudad.nombre,
            poblacion: ciudad.poblacion || 0, // Si no tiene población, se coloca 0
          }))
        );
      }
    }

    getCiudades();
  }, []);

  // 📄 Función para imprimir con window.print()
  const imprimirNavegador = () => {
    window.print();
  };

  // 📄 Función para exportar a PDF con jsPDF + html2canvas
  const exportarPDF = () => {
    const input = document.getElementById("listado");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("listado_ciudades.pdf");
    });
  };

  // 📄 Definir el informe en PDF con react-pdf
  const ReporteCiudades = ({ datos }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}> Listado de Ciudades</Text>
        {datos.map((ciudad, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{ciudad.nombre}</Text>
            <Text style={styles.cell}>{ciudad.poblacion}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
  const exportarGraficaPDF = () => {
    const input = document.getElementById("grafica");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("grafica_ciudades.pdf");
    });
  };

  // 🗑️ Función para eliminar una ciudad
  const handleDelete = async (id) => {
    let response = await fetch(apiUrl + "/ciudades/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      const ciudadesTrasBorrado = rows.filter((ciudad) => ciudad.id !== id);
      setRows(ciudadesTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de Ciudades
      </Typography>
      {/* Botones de Impresión */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={imprimirNavegador}
        >
          🖨️ Imprimir Página
        </Button>
        <Button variant="contained" color="primary" onClick={exportarPDF}>
          📄 Exportar PDF (Imagen)
        </Button>
        <PDFDownloadLink
          document={<ReporteCiudades datos={rows} />}
          fileName="listado_ciudades_reporte.pdf"
        >
          {({ loading }) =>
            loading ? (
              <Button variant="contained" disabled>
                Cargando PDF...
              </Button>
            ) : (
              <Button variant="contained" color="success">
                📄 Exportar PDF (Informe)
              </Button>
            )
          }
        </PDFDownloadLink>
      </Box>
      {/* Tabla de Ciudades */}
      <Box sx={{ mx: 4 }} id="listado">
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">País</TableCell>
                <TableCell align="right">Población</TableCell>
                <TableCell align="center">Eliminar</TableCell>
                <TableCell align="center">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
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
      {/* 📊 Gráfica de Ciudades por Población */}
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h5">📊 Población de Ciudades</Typography>
        <Box
          id="grafica"
          sx={{ backgroundColor: "white", p: 2, borderRadius: "10px" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={datosGrafica}
                dataKey="poblacion"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {datosGrafica.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={exportarGraficaPDF}
          sx={{ mt: 2 }}
        >
          📄 Exportar Gráfica a PDF
        </Button>
      </Box>
    </>
  );
}

// 🎨 Estilos para el PDF con react-pdf
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5 },
  cell: { width: "50%", fontSize: 12 },
});

export default ListadoCiudades;
