import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/series").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const deleteSerie = (id) => {
    axios.delete(`/api/series/${id}`).then((res) => {
      const dataFilter = data.filter((item) => item.id !== id);
      setData(dataFilter);
    });
  };

  const renderSeries = (record) => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteSerie(record.id)}
          >
            Deletar
          </button>
          <Link to={`/series/${record.id}`} className="btn btn-warning">
            Info
          </Link>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <div className="alert alert-secondary" role="alert">
          Nao ha series cadastradas no momento...
        </div>
        <Link to="/series/new" className="btn btn-primary">
          Nova série
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Series</h1>
      <Link to="/series/new" className="btn btn-primary">
        Nova série
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
        <tbody>{data.map(renderSeries)}</tbody>
      </table>
    </div>
  );
};

export default Series;
