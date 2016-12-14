import angular from 'angular';

angular.module('usatoday')
  .controller('userTotalController',
    ['$scope', '$rootScope', 'entryService',
      function($scope, $rootScope, entryService) {
        $scope.total = 0;
        
        $rootScope.$on('newEntry', function() {
          entryService.getSum()
            .then(function(sum) {
              $scope.total = sum;  
            });
        });
  }]);