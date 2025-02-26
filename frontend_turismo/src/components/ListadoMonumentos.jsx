import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

// Función para acortar nombres largos
const truncarNombre = (nombre, maxLength = 12) => {
  return nombre.length > maxLength
    ? nombre.substring(0, maxLength) + "..."
    : nombre;
};

function ListadoMonumentos() {
  const [rows, setRows] = useState([]);
  const [datosGrafica, setDatosGrafica] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMonumentos() {
      let response = await fetch(apiUrl + "/monumentos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
        setDatosGrafica(
          data.datos.map((monumento) => ({
            nombre: truncarNombre(monumento.nombre),
            año: monumento.añoConstruccion || 0, // Si no tiene año, se coloca 0
          }))
        );
      }
    }

    getMonumentos();
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
      pdf.save("listado_monumentos.pdf");
    });
  };

  // 📄 Definir el informe en PDF con react-pdf
  const ReporteMonumentos = ({ datos }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>📜 Listado de Monumentos</Text>
        {datos.map((monumento, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{monumento.nombre}</Text>
            <Text style={styles.cell}>{monumento.añoConstruccion}</Text>
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
      pdf.save("grafica_monumentos.pdf");
    });
  };

  const handleDelete = async (id) => {
    let response = await fetch(apiUrl + "/monumentos/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      const monumentosTrasBorrado = rows.filter(
        (monumento) => monumento.id !== id
      );
      setRows(monumentosTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de Monumentos
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
          document={<ReporteMonumentos datos={rows} />}
          fileName="listado_monumentos_reporte.pdf"
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

      {/* Tabla de Monumentos */}
      <Box sx={{ mx: 4 }} id="listado">
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">ID Ciudad</TableCell>
                <TableCell align="right">Año Construcción</TableCell>
                <TableCell align="center">Eliminar</TableCell>
                <TableCell align="center">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.ciudad_id}</TableCell>
                  <TableCell align="right">{row.añoConstruccion}</TableCell>
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
                      onClick={() => navigate("/modificarmonumento/" + row.id)}
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

      {/* 📊 Gráfica de Monumentos por Año */}
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h5">
          📊 Año de Construcción de Monumentos
        </Typography>
        <Box
          id="grafica"
          sx={{ backgroundColor: "white", p: 2, borderRadius: "10px" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={datosGrafica}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="año" fill="#8884d8" />
            </BarChart>
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

export default ListadoMonumentos;
