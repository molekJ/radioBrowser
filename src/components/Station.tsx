import { useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import { Station as StationInterface } from "../types/interfaces";

export const Station = (props: {
  props: StationInterface;
  handleStation: (url: string) => void;
}) => {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite((old) => !old);
  };

  return (
    <Card className="station-component flex-row align-items-center px-1">
      <Card.Img src={props.props.favicon ? props.props.favicon : unknown} />
      <Card.Body className="d-flex flex-column">
        <Col className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={() => {
              props.handleStation(props.props.url);
            }}
          >
            <i className="bi bi-play-circle" style={{ fontSize: 30 }}></i>
          </Button>
          <Card.Title>{props.props.name}</Card.Title>
        </Col>
        <Col>
          <Button variant="link" onClick={handleFavorite}>
            <i className={favorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};
