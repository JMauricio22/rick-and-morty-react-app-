import React from "react";
import { Alert } from "react-bootstrap";

export default function Error() {
  return (
    <Alert className='mt-2' variant='danger'>
      <Alert.Heading>Error!</Alert.Heading>
      <p>Oops something went wrong 😰.</p>
    </Alert>
  );
}
