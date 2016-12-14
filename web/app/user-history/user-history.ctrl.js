import angular from 'angular';

angular.module('usatoday')
  .controller('userHistoryController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.history = [];

    $rootScope.$on('newEntry', function(ev, entry) {
      $scope.history.push(entry);
    });
  }]);