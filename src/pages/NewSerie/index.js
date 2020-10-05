import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NewSerie = () => {
  const [name, setName] = useState("");

  const [success, setSuccess] = useState(false);

  const onChange = (evt) => {
    setName(evt.target.value);
  };

  const saveSerie = () => {
    axios
      .post("/api/series", {
        name,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div className="container">
      <h1>Nova Serie</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Nome da Serie"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="button" onClick={saveSerie} className="btn btn-primary">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default NewSerie;
