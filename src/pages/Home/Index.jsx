import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { getAllCharacters } from "../../services/characters";
import CharacterCard from "../../components/CharacterCard/Index";
import Error from "../../components/Error";
import useFavorites from "../../hooks/useFavorites";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [favorites, updateFavorites] = useFavorites();
  const [error, setError] = useState(null);
  const controller = useRef();
  const containerRef = useRef();

  const fetchData = async (url) => {
    try {
      const { data, info } = await getAllCharacters(
        controller.current.signal,
        url
      );
      const characters = [...items].concat(data);
      setItems(characters);
      setPagination({ next: info.next, prev: info.prev });
      controller.current = null;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    fetchData();

    return function cleanup() {
      if (controller.current) {
        controller.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    function getCharacters() {
      if (
        Math.ceil(window.scrollY) + window.innerHeight >=
        document.body.clientHeight
      ) {
        if (!controller.current) {
          if (pagination.next) {
            controller.current = new AbortController();
            setLoading(true);
            fetchData(pagination.next);
          }
        }
      }
    }

    window.addEventListener("scroll", getCharacters);

    return () => {
      window.removeEventListener("scroll", getCharacters);
    };
  }, [pagination]);

  const getView = () => (
    <Row className='mt-4' ref={containerRef}>
      {items.map((character) => (
        <Col
          // sm={12}
          md={12}
          lg={6}
          data-testid='Col:Character'
          className='mb-4'
          key={character.id}
        >
          <CharacterCard
            character={character}
            isFavorite={favorites[character.id]}
            updateFavorites={updateFavorites}
          />
        </Col>
      ))}
      {loading && (
        <Col xs={{ span: 2, offset: 5 }} className='text-center mt-4'>
          <Spinner animation='grow' role='status' variant='success'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Col>
      )}
    </Row>
  );

  const getErrorView = () => <Error />;

  return <>{error ? getErrorView() : getView()}</>;
}
