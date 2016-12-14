import angular from 'angular';
import template from './user-total.html';

angular.module('usatoday')
  .directive('usatUserTotal', function() {
    return {
      template: template,
      controller: 'userTotalController',
      scope: {}
    }
  });