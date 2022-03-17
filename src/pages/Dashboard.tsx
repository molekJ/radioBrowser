import { RadioBrowserApi } from "radio-browser-api";
import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";

export const Dashboard = () => {
  const RadioBrowser = new RadioBrowserApi("My Radio App");

  const [stations, setStations] = useState<any | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    RadioBrowser.searchStations({
      countryCode: "PL",
      limit: 10,
    })
      .then((response) => {
        setStations(response);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Row>
        {isLoading
          ? "Loading..."
          : stations.map((station: any, index: any) => {
              console.log(station.favicon);
              return (
                <Col key={index}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      src={station.favicon ? station.favicon : unknown}
                      variant="bottom"
                    />
                    <Card.Body>
                      <Card.Title>{station.name}</Card.Title>
                      <Card.Text>
                        {station.country}, votes: {station.votes}
                      </Card.Text>
                      <Button>Play</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};
