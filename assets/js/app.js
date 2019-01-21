/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.scss in this case)
require('../css/app.scss');

// Init Libraries
const $ = require('jquery');
require('bootstrap');
require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');
const React = require('react');
const ReactDOM = require('react-dom');

// Initilize Our Event Handler
import AppEventHandler from './AppEventHandler.js';
const AppEvents = new AppEventHandler();


// Initilize AlbumApp Components
import AlbumApp from './AlbumApp.js';
// AlbumTiles
ReactDOM.render(
    <AlbumApp renderObj="albumtiles" eventHandler={AppEvents}/>,
    document.getElementById('main-content')
);
// AlbumSearch
ReactDOM.render(
    <AlbumApp renderObj="albumsearch" eventHandler={AppEvents}/>,
    document.getElementById('album-search-form-container')
);
