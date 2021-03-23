import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUser, setRetrieved } from "./state/slices/user";
import { theme } from "./theme";
import Login from "./Login";
import Home from "./Home";
import feathersApp from "./feathers";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //taking token in the browser and checking what user is associated with it
    feathersApp
      .reAuthenticate()
      .then((data) => {
        console.log(data.user);
        dispatch(setUser(data.user));
      })
      .catch((err) => {
        dispatch(setRetrieved(true));
        console.log("error", err);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
