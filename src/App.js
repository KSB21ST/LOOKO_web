import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import mall from './pages/mall'
import test from './pages/test'
import product from './pages/product'


function App() {
  return (
    <Router>
      <header>
        <Link to="/mall">
          <button>쇼핑몰 정보</button>
        </Link>
        <Link to="/about">
          <button>상품정보</button>
        </Link>
        <Link to="/test">
          <button>테스트</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/mall" component={mall} />
          <Route path="/about" component={product} />
          <Route component={test} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;