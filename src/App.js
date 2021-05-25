import React from "react";

// import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import Home from './pages/home';
import Stats from './pages/stats';
import News from './pages/news';
import Layout from './components/Layout/Layout';
import {ThemeProvider} from '@material-ui/core';
import theme from './Theme';
// import CssBaseline from '@material-ui/core/css/baseline';


import "@elastic/react-search-ui-views/lib/styles/styles.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Router>
        <Layout>
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/news">
                <News />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
      
  );
}
