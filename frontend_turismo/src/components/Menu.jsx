import { useState } from "react";
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

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="primary">
      <MDBContainer fluid>
        {/* Logo */}
        <MDBNavbarBrand>
          <img src={logo} height="30" alt="logo" loading="lazy" />
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
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
          <MDBNavbarNav
            className="mr-auto mb-2 mb-lg-0"
            style={{ justifyContent: "flex-end" }}
          >
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
                    <MDBDropdownItem link>
                      Listado de Monumentos
                    </MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Menu;
