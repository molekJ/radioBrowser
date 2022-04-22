import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import ReactAudioPlayer from "react-audio-player";
import { StationSection } from "../components/StationSection";
import RadioApi from "../service/radio-api";
import { Station as StationInterface } from "../types/interfaces";

const api = new RadioApi();

export const HomePage = () => {
  /** States */

  const [stations, setStations] = useState<StationInterface[]>([]);
  const [error, setError] = useState();

  const [currentStation, setCurrentStation] = useState<string>("");
  const [rockStations, setRockStations] = useState<StationInterface[]>([]);
  const [classicStations, setClassicStations] = useState<StationInterface[]>(
    []
  );
  const [technoStations, setTechnoStations] = useState<StationInterface[]>([]);

  /** Favorite */

  const [favoriteStationsId, setFavoriteStationsId] = useState<string[]>(
    getItemsFromLocaleStorage()
  );
  const [favoriteStations, setFavoriteStations] = useState<StationInterface[]>(
    []
  );

  /** Effects */

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

  useEffect(() => {
    setRockStations(filteredStation("rock"));
    setClassicStations(filteredStation("classic"));
    setTechnoStations(filteredStation("pop"));
  }, [stations]);

  useEffect(() => {
    localStorage.setItem(
      "favorite-stations",
      JSON.stringify(favoriteStationsId)
    );
  }, [favoriteStationsId]);

  useEffect(() => {
    setFavoriteStations(getFavoriteStations());
  }, [favoriteStations]);

  /** Functions */

  const filteredStation = (tag: string) => {
    return stations
      .filter((station) => {
        return station.tags.includes(tag) && station.favicon !== "";
      })
      .sort(compareStations)
      .slice(0, 8);
  };

  const compareStations = (a: StationInterface, b: StationInterface) => {
    if (a.votes < b.votes) {
      return 1;
    }
    if (a.votes > b.votes) {
      return -1;
    }
    return 0;
  };

  const handleStation = (url: string) => {
    setCurrentStation((old) => url);
  };

  function getFavoriteStations() {
    return stations.filter((station) => {
      return favoriteStationsId.includes(station.url);
    });
  }

  //** LocaleStorage */

  function getItemsFromLocaleStorage() {
    return JSON.parse(localStorage.getItem("favorite-stations") || "[]");
  }

  return (
    <Container>
      {" "}
      <Row>
        <Col className="d-flex justify-content-center">
          <p>Ulubione ID{favoriteStationsId}</p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <ReactAudioPlayer src={currentStation} autoPlay controls />
        </Col>
      </Row>
      <Row>
        {stations.length === 0 ? (
          "Loading"
        ) : (
          <>
            <StationSection
              props={{ stations: favoriteStations, title: "FAVORITE" }}
              handleStation={handleStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
            <StationSection
              props={{ stations: rockStations, title: "ROCK" }}
              handleStation={handleStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
            <StationSection
              props={{ stations: classicStations, title: "CLASSIS" }}
              handleStation={handleStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
            <StationSection
              props={{ stations: technoStations, title: "POP" }}
              handleStation={handleStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
          </>
        )}
      </Row>
    </Container>
  );
};
