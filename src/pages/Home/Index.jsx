/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { getAllCharacters } from "../../services/characters";
import CharacterCard from "../../components/CharacterCard/Index";
import Error from "../../components/Error";
import getFavorites from "../../utils/getFavoritesFromLocalStorage";
import useFavorites from "../../hooks/useFavorites";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [favorites, updateFavorites] = useFavorites();
  const [error, setError] = useState(null);
  const controller = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCharacters(controller.current.signal);
        if (mount) {
          setItems(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        if (mount) {
          setLoading(false);
        }
      }
    };

    let mount = true;

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

  const getView = () => (
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
            // sm={12}
            md={12}
            lg={6}
            data-testid='Col:Character'
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

  const getErrorView = () => <Error />;

  return <>{error ? getErrorView() : getView()}</>;
}
