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

  const [playedStation, setPlayedStation] = useState<string>("");

  const [rockStations, setRockStations] = useState<StationInterface[]>([]);
  const [classicStations, setClassicStations] = useState<StationInterface[]>(
    []
  );
  const [technoStations, setTechnoStations] = useState<StationInterface[]>([]);

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
    setRockStations(filterStation("rock"));
    setClassicStations(filterStation("classic"));
    setTechnoStations(filterStation("pop"));
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

  const filterStation = (tag: string) => {
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

  const handlePlayedStation = (url: string) => {
    setPlayedStation((old) => url);
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
          <ReactAudioPlayer src={playedStation} autoPlay controls />
        </Col>
      </Row>
      <Row>
        {stations.length === 0 ? (
          "Loading"
        ) : (
          <>
            <StationSection
              props={{ stations: favoriteStations, title: "FAVORITE" }}
              handlePlayedStation={handlePlayedStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
            <StationSection
              props={{ stations: rockStations, title: "ROCK" }}
              handlePlayedStation={handlePlayedStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
            <StationSection
              props={{ stations: classicStations, title: "CLASSIS" }}
              handlePlayedStation={handlePlayedStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
            <StationSection
              props={{ stations: technoStations, title: "POP" }}
              handlePlayedStation={handlePlayedStation}
              favoriteStationsId={favoriteStationsId}
              setFavoriteStationsId={setFavoriteStationsId}
            ></StationSection>
          </>
        )}
      </Row>
    </Container>
  );
};
