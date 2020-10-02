import React, { useState } from 'react';
import './App.css';
import HomePage from "./containers/HomePage";
import AdminPage from "./containers/AdminPage";
import UserPage from "./containers/UserPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

function App() {
  return <div className="App" >

        <Router>
            <span>
                <Link to="/" style={{ color: 'pink', textDecoration: 'none'}}>Homepage</Link>
            </span>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span>
                <Link to="/admin" style={{ color: 'pink', textDecoration: 'none'}}>Admin Page</Link>
            </span>
            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span>
                <Link to="/user" style={{ color: 'pink', textDecoration: 'none'}}>User Page</Link>
            </span>
            
            <Route exact path="/" component={HomePage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/user" component={UserPage} />

          </Router>
      </div>
    }

export default App;
