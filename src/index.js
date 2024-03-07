import html from './components/pages/index.pug';
// Import styles
import style from './sass/index.sass';
// Import scripts
global.$ = global.jQuery = require('jquery');
// import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import slick from 'slick-carousel';
global.Dotdotdot = require('dotdotdot-js');
global.selectJS = require('./js/select-js');
global.intlTelInput = require('intl-tel-input/build/js/intlTelInput-jquery.min');

import PerfectScrollbar from 'perfect-scrollbar';
import datepicker from 'bootstrap-datepicker';

window.jQuery = $;
window.PerfectScrollbar = PerfectScrollbar;
window.Dotdotdot = Dotdotdot;
// window.intlTelInput = intlTelInput;
window.datepicker = datepicker;

require('bootstrap-datepicker/js/locales/bootstrap-datepicker.uk');

import './js/common.js';