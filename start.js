// Babel Polyfill
require('babel-core/register');
require('babel-polyfill');

// Load App Environment
require('dotenv').config();

// Start App
require('./src/app.js');