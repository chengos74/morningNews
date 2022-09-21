import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource'
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'

import { Provider } from 'react-redux';
import { combineReducers }  from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import wishList from './reducers/articles.reducer'
import token from './reducers/token.reducer'
import country from './reducers/country.reducer'

const reducer = combineReducers({wishList, token, country})
const store = configureStore({reducer})

function App() {
  return (

    <Provider store={store}>

      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenSource} path="/screensource" exact />
          <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" />
          <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
        </Switch>
      </Router>

    </Provider>

  );
}

export default App;
