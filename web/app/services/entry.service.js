import angular from 'angular';

angular.module('usatoday')
  .factory('entryService', ['$http', '$q', 'config', function($http, $q, config) {
    var addEntry = function(entry) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: config.endpoints.createEntry,
        data: { value: entry }
      })
      .then(function() {
        deferred.resolve();
      })
      .catch(function(err) {
        console.error(err);
        deferred.reject();
      });     

      return deferred.promise;
    };

    var getSum = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: config.endpoints.getSumOfEntries
      })
      .then(function(data) {
        deferred.resolve(data.data);
      })
      .catch(function(err) {
        console.error(err);
        deferred.reject();
      });  

      return deferred.promise;
    };

    return {
      addEntry: addEntry,
      getSum: getSum
    };
  }]);