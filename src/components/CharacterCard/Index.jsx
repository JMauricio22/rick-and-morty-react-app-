import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
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

export default function CharacterCard({ character }) {
  return (
    <Card className='shadow cursor-pointer'>
      <Card.Img variant='top' src={character.image} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center fw-bold'>
          <div>
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
