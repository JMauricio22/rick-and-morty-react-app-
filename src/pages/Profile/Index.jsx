import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Image, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getCharacterById } from "../../services/characters";

const genders = {
  Male: {
    icon: faMars,
    color: "",
  },
  Female: {
    icon: faVenus,
    color: "",
  },
};

export default function Index() {
  const [character, setCharacter] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOriginLoading, setIsOriginLoading] = useState(true);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
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

  useEffect(() => {
    const getOrigin = async () => {
      try {
        const { data } = await axios.get(character.origin.url);
        setOrigin(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsOriginLoading(false);
      }
    };
    if (character && character.origin.url) {
      getOrigin();
    }
  }, [character]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { data } = await axios.get(character.location.url);
        setLocation(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLocationLoading(false);
      }
    };
    if (character && character.location.url) {
      getLocation();
    }
  }, [character]);

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
          <p>
            Status: {character.status} ({character.species}){" "}
          </p>
          <p>
            {character.gender}{" "}
            <FontAwesomeIcon icon={genders[character.gender].icon} />{" "}
          </p>
          {/* Origin */}
          <Row>
            <Col
              className='bg-dark p-2 text-center rounded-3 mb-4'
              xs={{ span: 4, offset: 4 }}
            >
              {isOriginLoading && (
                <div className='d-flex justify-content-center'>
                  <Spinner animation='border' role='status' variant='success'>
                    <span className='visually-hidden'>Loading...</span>
                  </Spinner>
                </div>
              )}
              {!isOriginLoading && (
                <>
                  <h2 className='h4'>First seen in: {origin.name} </h2>
                  <p className='mb-1'> Type: {origin.type} </p>
                  <p> Dimension: {origin.dimension} </p>
                </>
              )}
            </Col>
          </Row>
          {/* Location */}
          <Row>
            <Col
              className='bg-dark p-2 text-center rounded-3 mb-4'
              xs={{ span: 4, offset: 4 }}
            >
              {isLocationLoading && (
                <div className='d-flex justify-content-center'>
                  <Spinner animation='border' role='status' variant='success'>
                    <span className='visually-hidden'>Loading...</span>
                  </Spinner>
                </div>
              )}
              {!isLocationLoading && (
                <>
                  <h2 className='h4'>Last known location: {location.name} </h2>
                  <p className='mb-1'> Type: {location.type} </p>
                  <p> Dimension: {location.dimension} </p>
                </>
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
