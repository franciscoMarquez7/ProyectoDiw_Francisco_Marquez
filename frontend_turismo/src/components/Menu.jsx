import { useState, useContext } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Iconos de luz y oscuridad
import { ThemeContext } from "../context/ThemeContext"; // Importa el contexto del tema

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);
  const { modoOscuro, toggleTheme } = useContext(ThemeContext); // Accede al contexto del tema

  return (
    <MDBNavbar expand="lg" light={!modoOscuro} dark={modoOscuro} bgColor={modoOscuro ? "dark" : "primary"}>
      <MDBContainer fluid>
        {/* Logo */}
        <MDBNavbarBrand>
          <img src={logo} height="30" alt="logo" loading="lazy" />
          <Link to="/" style={{ color: modoOscuro ? "white" : "black", textDecoration: "none" }}>
            <h2>InfoTurismo</h2>
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0" style={{ justifyContent: "flex-end" }}>
            {/* Menú de Ciudades */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Ciudades
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altaciudad" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Alta de Ciudad</MDBDropdownItem>
                  </Link>
                  <Link to="/listadociudades" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de Ciudades</MDBDropdownItem>
                  </Link>
                  <Link to="/listadociudadesfiltrado" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de Ciudades Filtrado</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {/* Menú de Monumentos */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Monumentos
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altamonumento" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Alta de Monumento</MDBDropdownItem>
                  </Link>
                  <Link to="/listadomonumentos" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de Monumentos</MDBDropdownItem>
                  </Link>
                  <Link to="/listadomonumentosfiltrado" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de Monumentos Filtrado</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {/* Botón para cambiar el tema */}
            <MDBNavbarItem>
              <IconButton onClick={toggleTheme} sx={{ color: "inherit" }}>
                {modoOscuro ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </MDBNavbarItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Menu;
