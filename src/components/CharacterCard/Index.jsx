import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
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
    <Card className='shadow'>
      <button
        ref={favoritesButtonRef}
        className='position-absolute end-0 me-1 mt-1 bg-transparent border-0'
        onClick={isFavorite ? removeToFavorites : addToFavorites}
      >
        <FontAwesomeIcon
          data-testid='Svg::Icon'
          icon={isFavorite ? faStar : faStarRegular}
          className='fs-3  text-warning'
        />
      </button>
      <Card.Img variant='top' src={character.image} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center fw-bold'>
          <div data-testid='Div::Title'>
            <span
              className={`bg-${statusColor[character.status]} status`}
            ></span>
            {character.name} ({character.species})
          </div>
          <FontAwesomeIcon
            icon={gender[character.gender]}
            className={`
                  ${character.gender === "Male" ? "male-color" : "female-color"}

                  fs-5
                  `}
          />
        </Card.Title>
        <Card.Text as='div'>
          <div>
            Origin:{" "}
            <span
              className={
                character.origin.name === "unknown"
                  ? "text-decoration-line-through"
                  : ""
              }
            >
              {character.origin.name}
            </span>
          </div>
          <div>Location: {character.location.name}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
