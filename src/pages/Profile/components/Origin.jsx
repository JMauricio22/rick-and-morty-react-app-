import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner, Col, Row } from "react-bootstrap";
import axios from "axios";

export default function Origin({ url }) {
  const [origin, setOrigin] = useState(null);
  const [isOriginLoading, setIsOriginLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrigin = async () => {
    try {
      setIsOriginLoading(true);
      const { data } = await axios.get(url);
      setOrigin(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsOriginLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      getOrigin();
    }
  }, [url]);

  const getView = () => (
    <>
      {isOriginLoading && (
        <div className='d-flex justify-content-center'>
          <Spinner animation='border' role='status' variant='success'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}
      {!isOriginLoading && origin && (
        <>
          <h2 className='h4'>First seen in: </h2>
          <h3 className='h5'>{origin.name} </h3>
          <p className='mb-1'> Type: {origin.type} </p>
          <p> Dimension: {origin.dimension} </p>
        </>
      )}
      {!isOriginLoading && !origin && <h2 className='h4'>Origin Unknown</h2>}
    </>
  );

  const getErrorView = () => (
    <h3 className='h5'>something went wrong getting the origin 😢</h3>
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

Origin.prototype = {
  url: PropTypes.string.isRequired,
};
