import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";

import Home from "./pages/Home";
import Genres from "./pages/Genres";
import NewGenre from "./pages/NewGenre";
import EditGenre from "./pages/EditGenre";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get("/api").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/genres" component={Genres} />
          <Route exact path="/genres/new" component={NewGenre} />
          <Route exact path="/genres/:id" component={EditGenre} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
