import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NewGenre = () => {
  const [name, setName] = useState("");

  const [success, setSuccess] = useState(false);

  const onChange = (evt) => {
    setName(evt.target.value);
  };

  const saveGenre = () => {
    axios
      .post("/api/genres", {
        name,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/genres" />;
  }

  return (
    <div className="container">
      <h1>Novo Genero</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Genero"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="button" onClick={saveGenre} className="btn btn-primary">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default NewGenre;
