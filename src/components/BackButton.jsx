import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="button-53" onClick={() => navigate(-1)} role="button">
      ← go back
    </button>
  );
}
