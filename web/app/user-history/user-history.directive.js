import angular from 'angular';
import template from './user-history.html';

angular.module('usatoday')
  .directive('usatUserHistory', function() {
    return {
      template: template,
      controller: 'userHistoryController',
      scope: {}
    };
});