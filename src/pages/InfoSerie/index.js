import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge, FormFeedback } from "reactstrap";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [data, setData] = useState({});

  useEffect(() => {
    const id = match.params.id;
    axios.get(`/api/series/${id}`).then((res) => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id]);

  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const onChange = (field) => (evt) => {
    setForm({
      ...form,
      [field]: evt.target.value,
    });
  };

  const saveSerie = () => {
    axios
      .post("/api/series", {
        form,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  <Badge color="success">Assistido</Badge>
                  <Badge color="warning">Assistir</Badge>
                  Genero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button onClick={() => setMode("EDIT")} className="btn btn-primary">
          Editar
        </button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Nova Serie</h1>
          <button onClick={() => setMode("INFO")} className="btn btn-primary">
            Cancelar edicao
          </button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                className="form-control"
                type="text"
                id="name"
                placeholder="Nome da Serie"
                value={form.name}
                onChange={onChange("name")}
              />
              <label htmlFor="name">Comentarios</label>
              <input
                className="form-control"
                type="text"
                id="comments"
                placeholder="Comentarios"
                value={form.comments}
                onChange={onChange("comments")}
              />
            </div>
            <button
              type="button"
              onClick={saveSerie}
              className="btn btn-primary"
            >
              Adicionar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
