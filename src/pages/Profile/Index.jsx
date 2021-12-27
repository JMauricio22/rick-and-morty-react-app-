import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { getCharacterById } from "../../services/characters";
import PageNotFound from "../../components/PageNotFound";
import Error from "../../components/Error";
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
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getCharacter = async () => {
    try {
      const data = await getCharacterById(id, null);
      setCharacter(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacter();
  }, []);

  const getView = () => (
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
            {character.gender === "unknown"
              ? `Gender: ${character.gender}`
              : character.gender}{" "}
            {character.gender !== "unknown" && (
              <FontAwesomeIcon
                color={genders[character.gender].color}
                icon={genders[character.gender].icon}
              />
            )}
          </p>
          {/* Origin */}
          <Origin url={character ? character.origin.url : ""} />
          {/* Location */}
          <Location url={character ? character.location.url : ""} />
        </div>
      )}
    </>
  );

  const getErrorView = (error) =>
    error.response && error.response.status === 404 ? (
      <PageNotFound />
    ) : (
      <Error />
    );

  return <>{error ? getErrorView(error) : getView()}</>;
}
