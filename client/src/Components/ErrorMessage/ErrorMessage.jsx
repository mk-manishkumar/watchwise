import React from "react";
import "./ErrorMessage.css";

const ErrorPage = ({ statusCode, message }) => {
  return (
    <div className="error-wrapper">
      <h1>{statusCode}</h1>
      <p>{message || "An unexpected error occurred."}</p>
      <a href="/">Go Back to Home</a>
    </div>
  );
};

export default ErrorPage;
