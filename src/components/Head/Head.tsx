import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logout, selectIsAuth } from "../../redux/slices/auth";


import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import "./head.css";

const Head: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => selectIsAuth(state));

  const onClickLogout = () => {
    if (window.confirm("Сіз шынымен шығуды қалайсызба?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="header bg-gray-800">
      <Container>
        <Navbar.Brand className="navbar-brand" as={Link} to="/">
          АЙНҰР-ЕРНҰР
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Басты бет
            </Nav.Link>
            <NavDropdown title="Біз Туралы" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/OurTeam">
                Балабақша ұжымы
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Success">
                Біздің жетістіктеріміз
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Groups">
                Балабақша топтары
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Gallerys">
                Галерея
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/FoodMenu">
                Ас мәзірі
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Kindergarten">
                Балабақшамыз туралы
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/FileTable">
              Балабақша құжаттары
            </Nav.Link>
            <Nav.Link as={Link} to="/Contacts">
              Байланыстар
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuth ? (
              <Button onClick={onClickLogout} variant="danger">
                Шығу
              </Button>
            ) : (
              <>
                <Link to="/LoginPage">
                  <Button className="log__btn" variant="primary" style={{ marginRight: "10px" }}>
                    Кіру
                  </Button>
                </Link>
                <Link to="/RegisterPage">
                  <Button className="sign__btn" variant="warning">
                    Тіркелу
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Head;