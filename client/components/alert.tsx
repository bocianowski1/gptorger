import React from "react";

interface Props {
  message: string;
}

const Alert = ({ message }: Props) => {
  return (
    <div>
      <h4>Alert</h4>
      <h5>{message}</h5>
    </div>
  );
};

export default Alert;
