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
  favoriteStationsId: string[];
  setFavoriteStationsId: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <Container className="my-3">
      <Row className="mb-2">
        <Col>
          <h3>{props.props.title}</h3>
        </Col>
      </Row>
      <Row>
        {props.props.stations.map((station) => (
          <Col className="mb-3" key={station.url} sm={6} lg={4}>
            <Station
              props={station}
              handleStation={props.handleStation}
              favoriteStationsId={props.favoriteStationsId}
              setFavoriteStationsId={props.setFavoriteStationsId}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
