import { Container, Row, Col, CardGroup, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";

const App = () => {
  return (
    <Container>
      <Dashboard />
    </Container>
  );
};

export default App;
