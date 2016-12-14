import angular from 'angular';
import template from './user-entry.html';

angular.module('usatoday')
  .directive('usatUserEntry', function() {
    return {
      template: template,
      controller: 'userEntryController',
      scope: {}
    }
})