import { Container, Row, Col, Button } from "react-bootstrap";
import { Station } from "./Station";
import { Station as StationInterface } from "../types/interfaces";
interface StationSectionInterface {
  stations: StationInterface[];
  title: string;
}

export const StationSection = (props: { props: StationSectionInterface }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>{props.props.title}</h3>
        </Col>
      </Row>
      <Row>
        {props.props.stations.map((station) => (
          <Col sm={3}>
            <Station props={station} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
