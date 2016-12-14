describe('Unit: Test User Entry Controller', function() {

  var controller;
  var $scope;
  var $rootScope;
  beforeEach(angular.mock.module('usatoday'));
  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $scope = $rootScope.$new();
    entryServiceMock = $injector.get('entryServiceMock');

    controller = $controller('userEntryController', {$scope: $scope, $rootScope: $rootScope, entryService: entryServiceMock});
  }));

  it('should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should default entry value on $scope', function() {
    expect($scope.entry).toBeDefined();
  });

  it('should have addEntry function created', function() {
    expect($scope.addEntry).toBeDefined();
  })

  it('should call $rootScope.$emit on new entries', function() {
      spyOn($rootScope, '$emit');

      $scope.addEntry(2);
      $rootScope.$digest();

      expect($rootScope.$emit).toHaveBeenCalledWith('newEntry', 2);
  });

});