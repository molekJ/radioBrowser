import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import ReactAudioPlayer from "react-audio-player";
import { StationSection } from "../components/StationSection";
import RadioApi from "../service/radio-api";
import { Station as StationInterface } from "../types/interfaces";

const api = new RadioApi();

export const HomePage = () => {
  const [stations, setStations] = useState<StationInterface[]>([]);
  const [error, setError] = useState();

  const [radio, setRadio] = useState("");
  const [currentStation, setCurrentStation] = useState<string>("");

  useEffect(() => {
    api
      .stations()
      .then((data) => {
        setStations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredStation = (tag: string) => {
    return stations.filter((station) => {
      return station.tags.includes(tag) && station.favicon !== "";
    });
  };

  const [rockStation, setRockStation] = useState<StationInterface[]>([]);
  const [classicStation, setClassicStation] = useState<StationInterface[]>([]);
  const [technoStation, setTechnoStation] = useState<StationInterface[]>([]);

  useEffect(() => {
    setRockStation(filteredStation("rock"));
    setClassicStation(filteredStation("classic"));
    setTechnoStation(filteredStation("techno"));
  }, [stations]);

  const handleStation = (url: string) => {
    setCurrentStation((old) => url);
  };

  return (
    <Container>
      <Row>
        <Col>
          <p>Słuchasz: {currentStation}</p>
          <ReactAudioPlayer src={currentStation} autoPlay controls />
        </Col>
      </Row>

      <Row>
        {stations.length === 0 ? (
          "Loading"
        ) : (
          <>
            <StationSection
              props={{ stations: rockStation, title: "ROCK" }}
              handleStation={handleStation}
            ></StationSection>
            <StationSection
              props={{ stations: classicStation, title: "CLASSIS" }}
              handleStation={handleStation}
            ></StationSection>
            <StationSection
              props={{ stations: technoStation, title: "TECHNO" }}
              handleStation={handleStation}
            ></StationSection>
          </>
        )}
      </Row>
    </Container>
  );
};
