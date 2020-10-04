import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Genres = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/genres").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const deleteGenre = (id) => {
    axios.delete(`/api/genres/${id}`).then((res) => {
      const dataFilter = data.filter((item) => item.id !== id);
      setData(dataFilter);
    });
  };

  const renderGenres = (record) => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteGenre(record.id)}
          >
            Deletar
          </button>
          <Link to={`/genres/${record.id}`} className="btn btn-warning">
            Editar
          </Link>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container-fluid">
        <div className="alert alert-secondary" role="alert">
          Nao ha generos cadastrados no momento...
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h1>Generos</h1>
      <Link to="/genres/new" className="btn btn-primary">
        Novo genero
      </Link>
      <br />
      <br />
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{data.map(renderGenres)}</tbody>
      </table>
    </div>
  );
};

export default Genres;
