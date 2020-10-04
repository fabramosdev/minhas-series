import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditGenre = ({ match }) => {
  const [name, setName] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    axios.get(`/api/genres/${id}`).then((res) => {
      setName(res.data.name);
    });
  }, [match.params.id]);

  const onChange = (evt) => {
    setName(evt.target.value);
  };

  const saveGenre = () => {
    const id = match.params.id;
    axios
      .put(`/api/genres/${id}`, {
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
      <h1>Editar Genero</h1>
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
          Editar
        </button>
      </form>
    </div>
  );
};

export default EditGenre;
