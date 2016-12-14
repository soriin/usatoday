angular.module('usatoday')
  .factory('entryServiceMock', ['$q', function($q) {
    var total = 0;
    var addEntry = function(entry) {
      var deferred = $q.defer();
      total += entry;
      deferred.resolve();
      return deferred.promise;
    };

    var getSum = function() {
      var deferred = $q.defer();
      deferred.resolve(total);
      return deferred.promise;
    };

    return {
      addEntry: addEntry,
      getSum: getSum
    };
  }]);