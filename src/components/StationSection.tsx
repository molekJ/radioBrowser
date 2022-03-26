import { Container, Row, Col } from "react-bootstrap";
import { Station } from "./Station";

interface StationSectionInterface {
  title: string;
}

const arr = [1, 2, 3, 4, 5];
export const StationSection = (props: StationSectionInterface) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>{props.title}</h3>
        </Col>
      </Row>
      <Row>
        {arr.map((el) => (
          <Col md={3}>
            <Station></Station>;
          </Col>
        ))}
      </Row>
    </Container>
  );
};
