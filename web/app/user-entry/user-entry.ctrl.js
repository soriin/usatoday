import angular from 'angular';

angular.module('usatoday')
  .controller('userEntryController', 
    ['$scope', '$rootScope', 'entryService', 
      function($scope, $rootScope, entryService) {
        $scope.entry = {value: 0};

        $scope.addEntry = function(entry) {
          entryService.addEntry(Number(entry))
            .then(function() {
              $rootScope.$emit('newEntry', entry);
            })
            .catch(function(err) {
              console.error(err);
            });
        };
}]);