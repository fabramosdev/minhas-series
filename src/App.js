import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Genres from "./pages/Genres";
import NewGenre from "./pages/NewGenre";
import EditGenre from "./pages/EditGenre";
import Series from "./pages/Series";
import NewSerie from "./pages/NewSerie";
import InfoSerie from "./pages/InfoSerie";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/genres" component={Genres} />
          <Route exact path="/genres/new" component={NewGenre} />
          <Route exact path="/genres/:id" component={EditGenre} />
          <Route exact path="/series" component={Series} />
          <Route exact path="/series/new" component={NewSerie} />
          <Route exact path="/series/:id" component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
