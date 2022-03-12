import React from 'react';
import ReactDOM from 'react-dom';
import App, { Root } from './components/app/App';
// import MarvelService from './services/MarvelService';
import './style/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);

