import React, { useEffect, useRef } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import "./css/CharacterCard.scss";

const statusColor = {
  Alive: "success",
  Dead: "danger",
  unknown: "warning",
};

export default function CharacterCard({
  character,
  isFavorite,
  updateFavorites,
}) {
  const navigate = useNavigate();
  const favoritesButtonRef = useRef();

  const addAnimationClassToFavoritesBtn = () => {
    favoritesButtonRef.current.classList.add("rotate-scale-up");
  };

  const addToFavorites = () => {
    const items = JSON.parse(localStorage.getItem("favorites")) || [];
    const favorites = items.concat([character]);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    addAnimationClassToFavoritesBtn();
    updateFavorites();
  };

  const removeToFavorites = () => {
    if (isFavorite) {
      const items = JSON.parse(localStorage.getItem("favorites")) || [];
      const favorites = items.filter((c) => c.id !== character.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      addAnimationClassToFavoritesBtn();
      updateFavorites();
    }
  };

  const goToCharacterPage = () => {
    navigate(`/character/${character.id}`);
  };

  useEffect(() => {
    const favoritesButton = favoritesButtonRef.current;

    function removeAnimationClass() {
      favoritesButton.classList.remove("rotate-scale-up");
    }

    favoritesButton.addEventListener(
      "animationiteration",
      removeAnimationClass
    );

    return function cleanup() {
      favoritesButton.removeEventListener(
        "animationiteration",
        removeAnimationClass
      );
    };
  }, []);

  return (
    <Container className='position-relative'>
      <button
        className='position-absolute end-0 top-0 bg-transparent border-0 me-4 mt-2'
        onClick={isFavorite ? removeToFavorites : addToFavorites}
        ref={favoritesButtonRef}
      >
        <FontAwesomeIcon
          data-testid='Svg::Icon'
          icon={isFavorite ? faStar : faStarRegular}
          className='fs-3  text-warning'
        />
      </button>
      <Row
        className='shadow bg-dark text-light rounded-4 overflow-hidden'
        style={{ cursor: "pointer" }}
        onClick={goToCharacterPage}
      >
        <Col md={5} sm={12} className='p-0'>
          <Image fluid src={character.image} className='w-100 h-100' />
        </Col>
        <Col md={7} sm={12} className='p-3'>
          <h2 className='h5 w-50 text-truncate' data-testid='Div::Title'>
            {character.name}
          </h2>
          <h3 className='h6'>
            <span
              className={`bg-${statusColor[character.status]} status`}
            ></span>
            {character.status} - {character.species}{" "}
          </h3>
          <p className='mb-1 fw-light text-truncate'>First seen in: </p>
          <p className='mb-1 fw-light text-truncate'>
            <span
              className={
                character.origin.name === "unknown"
                  ? "text-decoration-line-through text-muted"
                  : "text-muted"
              }
            >
              {character.origin.name}
            </span>
          </p>
          <p className='mb-1 fw-light text-truncate'>Last known location: </p>
          <p className='text-truncate'>
            <span className='text-muted'>{character.location.name}</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
