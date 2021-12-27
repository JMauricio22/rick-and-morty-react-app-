import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className='text-white text-center p-3'>
      <h1 className='mb-1 text-white' style={{ fontSize: 200 }}>
        404
      </h1>
      <p className='fs-4'>The Page you're looking for isn't here.</p>
      <Button variant='dark' onClick={goToHome}>
        Go to Home
      </Button>
    </div>
  );
}
