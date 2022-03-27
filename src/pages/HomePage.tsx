import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import ReactAudioPlayer from "react-audio-player";
import radioApi from "../service/radio-api";
import { StationSection } from "../components/StationSection";
import { RadioBrowserApi } from "radio-browser-api";

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

      <Row>
        {isLoading ? (
          "Loading"
        ) : (
          <StationSection props={{ stations, title: "PL" }}></StationSection>
        )}
      </Row>
    </Container>
  );
};
