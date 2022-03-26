import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import ReactAudioPlayer from "react-audio-player";
import radioApi from "../service/radio-api";
import { StationSection } from "../components/StationSection";
import { Station } from "../components/Station";

export const HomePage = () => {
  const RadioBrowser = radioApi;

  const [stations, setStations] = useState<any | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [radio, setRadio] = useState("");

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
        <Col>
          <ReactAudioPlayer src={radio} autoPlay controls />
        </Col>
      </Row>
      {/* <Row>
        {isLoading
          ? "Loading..."
          : stations.map((station: any, index: any) => {
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
                      <Button
                        onClick={() => {
                          setRadio(station.urlResolved);
                        }}
                      >
                        Play
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
      </Row> */}
      <StationSection title="polskie"></StationSection>
      <StationSection title="rock"></StationSection>
    </Container>
  );
};
