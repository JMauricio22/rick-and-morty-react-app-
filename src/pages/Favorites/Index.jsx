import React from "react";
import { Row, Col } from "react-bootstrap";
import CharacterCard from "../../components/CharacterCard/Index";
import useFavorites from "../../hooks/useFavorites";

export default function Index() {
  const [favorites, updateFavorites] = useFavorites();

  return (
    <Row className='mt-4'>
      {Object.values(favorites).map((character) => (
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
            isFavorite={true}
            updateFavorites={updateFavorites}
          />
        </Col>
      ))}
    </Row>
  );
}
