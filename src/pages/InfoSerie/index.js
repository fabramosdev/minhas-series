import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({ name: '' });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');

  const [data, setData] = useState({});
  useEffect(() => {
    const id = match.params.id;
    axios.get(`/api/series/${id}`).then((res) => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get("/api/genres").then((res) => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const found = genres.find(value => data.genre === value.name)
      
      if(found){
        setGenreId(found.id)
      }
    });
  }, [data, form]);

  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const onChangeGenre = evt => {
    setGenreId(evt.target.value)
  }

  const onChange = (field) => (evt) => {
    setForm({
      ...form,
      [field]: evt.target.value,
    });
  };

  const selectStatus = (value) => () => {
    setForm({
      ...form,
      status: value,
    });
  };

  const saveSerie = () => {
    axios.put(`/api/series/${match.params.id}`, { 
      ...form,
      genre_id: genreId
    }).then((res) => {
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
                  { data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge> }
                  { data.status === 'PARA_ASSISTIR' && <Badge color="warning">Assistir</Badge>}
                  Genero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button onClick={() => setMode("EDIT")} className="btn btn-primary">
          Editar
        </button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Editar</h1>
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
            </div>
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="name">Gênero</label>
              <select className="form-control" onChange={onChangeGenre} value={genreId}>
                {genres.map((genre) => (
                  <option
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="assistido"
                value="ASSISTIDO"
                onChange={selectStatus("ASSISTIDO")}
                checked={form.status === 'ASSISTIDO'}
              />
              <label htmlFor="assistido" className="form-check-label">
                Assistido
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="paraAssistir"
                value="PARA_ASSISTIR"
                onChange={selectStatus("PARA_ASSISTIR")}
                checked={form.status === 'PARA_ASSISTIR'}

              />
              <label htmlFor="paraAssistir" className="form-check-label">
                Para assistir
              </label>
            </div>

            <button
              type="button"
              onClick={saveSerie}
              className="btn btn-primary"
            >
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
