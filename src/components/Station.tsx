import { Card, Button } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";

export const Station = () => {
  return (
    <Card className="station-component">
      <Card.Img src={unknown} />
      <Card.Body>
        <Card.Title>Radio Z</Card.Title>
        <Card.Text>Sluchaj nas</Card.Text>
        <Button>Play</Button>
      </Card.Body>
    </Card>
  );
};
