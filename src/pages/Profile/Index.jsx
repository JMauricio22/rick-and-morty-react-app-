import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { getCharacterById } from "../../services/characters";
import Origin from "./components/Origin";
import Location from "./components/Location";

const genders = {
  Male: {
    icon: faMars,
    color: "#36a9e0",
  },
  Female: {
    icon: faVenus,
    color: "#ff77c3",
  },
};

export default function Index() {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await getCharacterById(id, null);
        console.log(id);
        console.log(data);
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCharacter();
  }, []);

  return (
    <>
      {isLoading && (
        <div className='d-flex justify-content-center mt-1'>
          <Spinner animation='grow' role='status' variant='success'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}
      {!isLoading && (
        <div className='text-light mt-1 text-center'>
          <h1> {character.name} </h1>
          <figure className='d-flex justify-content-center'>
            <Image fluid src={character.image} alt={character.name} />
          </figure>
          <p className='mb-1'>
            Status: {character.status} ({character.species}){" "}
          </p>
          <p>
            {character.gender}{" "}
            <FontAwesomeIcon
              color={genders[character.gender].color}
              icon={genders[character.gender].icon}
            />{" "}
          </p>
          {/* Origin */}
          <Origin url={character ? character.origin.url : ""} />
          {/* Location */}
          <Location url={character ? character.location.url : ""} />
        </div>
      )}
    </>
  );
}
