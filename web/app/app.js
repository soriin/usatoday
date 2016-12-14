import './styles/style.scss';
import angular from 'angular';

var ng = angular.module('usatoday', []);

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /^(?!.*spec).*\.js$/));
