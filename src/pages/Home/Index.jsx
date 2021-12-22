import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { getAllCharacters } from "../../services/characters";
import "./css/Index.css";

const statusColor = {
  Alive: "success",
  Dead: "danger",
  unknown: "warning",
};

const gender = {
  Male: faMars,
  Female: faVenus,
};

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCharacters();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Row>
      {loading && (
        <Col xs={{ span: 2, offset: 5 }} className='text-center mt-4'>
          <Spinner animation='grow' role='status' variant='success'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Col>
      )}
      {!loading &&
        items.map((character) => (
          <Col xs={4} className='mb-4'>
            <Card className='shadow cursor-pointer'>
              <Card.Img variant='top' src={character.image} />
              <Card.Body>
                <Card.Title class='d-flex justify-content-between align-items-center fw-bold'>
                  <div>
                    <span
                      className={`bg-${statusColor[character.status]} status`}
                    ></span>
                    {character.name} ({character.species})
                  </div>
                  <FontAwesomeIcon
                    icon={gender[character.gender]}
                    className={`
                        ${
                          character.gender === "Male"
                            ? "male-color"
                            : "female-color"
                        }

                        fs-5
                        `}
                  />
                </Card.Title>
                <Card.Text>
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
          </Col>
        ))}
    </Row>
  );
}
