import { Card, Button } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import { Station as StationInterface } from "../types/interfaces";

export const Station = (props: { props: StationInterface }) => {
  return (
    <Card className="station-component">
      <Card.Img src={props.props.favicon ? props.props.favicon : unknown} />
      <Card.Body>
        <Card.Title>{props.props.name}</Card.Title>
        <Card.Text>Sluchaj nas</Card.Text>
        <Button>Play</Button>
      </Card.Body>
    </Card>
  );
};
