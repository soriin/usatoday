import angular from 'angular';

angular.module('usatoday')
  .factory('config', ['baseUrl', function(baseUrl) {
    return {
      endpoints: {
        createEntry: `${baseUrl}/entries`,
        getSumOfEntries: `${baseUrl}/entries/sum`
      }
    };
  }]);

angular.module('usatoday')
  .factory('baseUrl', ['$location', function($location) {
    switch ($location.host()) {
      case 'localhost':
        return 'http://localhost:9124';

      default:
        return 'http://localhost:9124';
    }
  }]);