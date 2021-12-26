import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import CharacterCard from "../../components/CharacterCard/Index";
import useFavorites from "../../hooks/useFavorites";

export default function Index() {
  const [favorites, updateFavorites] = useFavorites();

  return (
    <>
      {Object.values(favorites).length === 0 && (
        <Alert variant='danger' className='mt-4'>
          <Alert.Heading>No items found</Alert.Heading>
          <p>Add items to favorites and you can view them here.</p>
        </Alert>
      )}
      <Row className='mt-4'>
        {Object.values(favorites).map((character) => (
          <Col
            md={12}
            lg={6}
            data-testid='Div::Col'
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
    </>
  );
}
