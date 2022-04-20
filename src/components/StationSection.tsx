import { Container, Row, Col, Button } from "react-bootstrap";
import { Station } from "./Station";
import { Station as StationInterface } from "../types/interfaces";
interface StationSectionInterface {
  stations: StationInterface[];
  title: string;
}

export const StationSection = (props: {
  props: StationSectionInterface;
  handleStation: (url: string) => void;
}) => {
  return (
    <Container className="my-5">
      <Row className="mb-2">
        <Col>
          <h3>{props.props.title}</h3>
        </Col>
      </Row>
      <Row>
        {props.props.stations.map((station) => (
          <Col className="mb-3" key={station.url} sm={4}>
            <Station props={station} handleStation={props.handleStation} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
