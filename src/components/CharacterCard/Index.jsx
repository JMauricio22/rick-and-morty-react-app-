/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { Card, Row, Col, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "./css/CharacterCard.css";

const statusColor = {
  Alive: "success",
  Dead: "danger",
  unknown: "warning",
};

const gender = {
  Male: faMars,
  Female: faVenus,
};

export default function CharacterCard({
  character,
  isFavorite,
  updateFavorites,
}) {
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
        className='position-absolute end-0 top-0 bg-transparent border-0 me-3 mt-1'
        onClick={isFavorite ? removeToFavorites : addToFavorites}
        ref={favoritesButtonRef}
      >
        <FontAwesomeIcon
          data-testid='Svg::Icon'
          icon={isFavorite ? faStar : faStarRegular}
          className='fs-3  text-warning'
        />
      </button>
      <Row className='shadow'>
        <Col lg={4} md={4} sm={12} className='p-0'>
          <div>
            <Image fluid src={character.image} className='w-100' />
          </div>
        </Col>
        <Col lg={8} md={8} sm={12} className='p-2'>
          <h2 className='h5' data-testid='Div::Title'>
            {character.name}
          </h2>
          <h3 className='h6'>
            <span
              className={`bg-${statusColor[character.status]} status`}
            ></span>
            {character.status} - {character.species}
          </h3>
          <p className='mb-1 fw-light'>
            Origin:{" "}
            <span
              className={
                character.origin.name === "unknown"
                  ? "text-decoration-line-through"
                  : "text-muted"
              }
            >
              {character.origin.name}
            </span>
          </p>
          <p className='mb-1 fw-light'>
            Location:{" "}
            <span className='text-muted'>{character.location.name}</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
