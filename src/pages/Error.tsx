import React from 'react';
import { Link } from "react-router-dom";

const Error: React.FC = () => {

  return (
    <>
    <div>404 - Not Found</div>
    <Link to="/">Go back</Link>
    </>
  )
}

export default Error
