describe('Unit: Test User History Controller', function() {

  var controller;
  var $scope;
  var $rootScope;
  beforeEach(angular.mock.module('usatoday'));
  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $scope = $rootScope.$new();

    controller = $controller('userHistoryController', {$scope: $scope, $rootScope: $rootScope});
  }));

  it('should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should have a history array on $scope', function() {
    expect($scope.history).toBeDefined();
  });

  it('should add to history on $rootScope.$emit(newEntry)', function() {
    expect($scope.history.length).toBe(0);
    $rootScope.$emit('newEntry', 2);
    expect($scope.history.length).toBe(1);
    expect($scope.history[0]).toBe(2);
  });
})