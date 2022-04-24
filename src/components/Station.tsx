import { useEffect, useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
import unknown from "../assets/images/unknown-radio.jpg";
import { Station as StationInterface } from "../types/interfaces";

export const Station = (props: {
  props: StationInterface;
  handlePlayedStation: (url: string) => void;
  favoriteStationsId: string[];
  setFavoriteStationsId: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      return removeFromFavoriteStations();
    }
    return addToFavoriteStations();
  };

  const addToFavoriteStations = () => {
    props.setFavoriteStationsId((favoriteStationsId) => [
      ...favoriteStationsId,
      props.props.url,
    ]);
  };

  const removeFromFavoriteStations = () => {
    props.setFavoriteStationsId((favoriteStationsId) =>
      favoriteStationsId.filter((old) => old != props.props.url)
    );
  };

  const checkFavoriteInLocaleStorege = () => {
    if (props.favoriteStationsId.some((el) => el === props.props.url)) {
      return setIsFavorite((favorite) => true);
    } else return setIsFavorite((favorite) => false);
  };

  const handleFavorite = () => {
    setIsFavorite((old) => !old);
    toggleFavorite();
  };

  useEffect(() => {
    checkFavoriteInLocaleStorege();
  }, [props.favoriteStationsId]);

  return (
    <Card className="station-component flex-row align-items-center px-1">
      <Card.Img src={props.props.favicon ? props.props.favicon : unknown} />
      <Card.Body className="d-flex flex-column">
        <Col className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={() => {
              props.handlePlayedStation(props.props.url);
            }}
          >
            <i className="bi bi-play-circle" style={{ fontSize: 30 }}></i>
          </Button>
          <Card.Title>{props.props.name}</Card.Title>
        </Col>
        <Col>
          <Button variant="link" onClick={handleFavorite}>
            <i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};
