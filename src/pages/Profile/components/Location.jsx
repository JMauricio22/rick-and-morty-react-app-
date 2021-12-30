import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner, Col, Row } from "react-bootstrap";
import axios from "axios";

export default function Location({ url }) {
  const [location, setLocation] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLocationLoading(true);
        const { data } = await axios.get(url);
        setLocation(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLocationLoading(false);
      }
    };
    if (url) {
      getLocation();
    }
  }, [url]);

  const getView = () => (
    <>
      {isLocationLoading && (
        <div className='d-flex justify-content-center'>
          <Spinner animation='border' role='status' variant='success'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}
      {!isLocationLoading && location && (
        <>
          <h2 className='h4'>Last known location: </h2>
          <h3 className='h5' data-testid='H3::Name'>
            {" "}
            {location.name}{" "}
          </h3>
          <p className='mb-1'> Type: {location.type} </p>
          <p> Dimension: {location.dimension} </p>
        </>
      )}
      {!isLocationLoading && !location && (
        <h2 className='h4'>Location Unknown </h2>
      )}
    </>
  );

  const getErrorView = () => (
    <h3 className='h5'>something went wrong getting the location 😢</h3>
  );

  return (
    <Row>
      <Col
        className='bg-dark p-2 text-center rounded-3 mb-4'
        xs={{ span: 8, offset: 2 }}
        md={{ span: 6, offset: 3 }}
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        {error ? getErrorView() : getView()}
      </Col>
    </Row>
  );
}

Location.prototype = {
  url: PropTypes.string.isRequired,
};
