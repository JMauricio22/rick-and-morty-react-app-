/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { getAllCharacters } from "../../services/characters";
import CharacterCard from "../../components/CharacterCard/Index";
import getFavorites from "../../utils/getFavoritesFromLocalStorage";
import useFavorites from "../../hooks/useFavorites";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [favorites, updateFavorites] = useFavorites();
  const controller = useRef();

  useEffect(() => {
    let mount = true;
    const fetchData = () => {
      getAllCharacters(controller.current.signal)
        .then((data) => {
          if (mount) {
            setItems(data);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          if (mount) {
            setLoading(false);
          }
        });
    };

    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    fetchData();

    return function cleanup() {
      if (controller.current) {
        controller.current.abort();
      }
      mount = false;
    };
  }, []);

  return (
    <Row className='mt-4'>
      {loading && (
        <Col xs={{ span: 2, offset: 5 }} className='text-center mt-4'>
          <Spinner animation='grow' role='status' variant='success'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Col>
      )}
      {!loading &&
        items.map((character) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            data-testid='CharacterCard'
            className='mb-4'
            key={character.name}
          >
            <CharacterCard
              character={character}
              isFavorite={favorites[character.id]}
              updateFavorites={updateFavorites}
            />
          </Col>
        ))}
    </Row>
  );
}
