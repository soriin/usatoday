describe('Unit: Test User Total Controller', function() {

  var controller;
  var $scope;
  var $rootScope;
  var entryServiceMock;
  beforeEach(angular.mock.module('usatoday'));
  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $scope = $rootScope.$new();
    entryServiceMock = $injector.get('entryServiceMock');

    controller = $controller('userTotalController', {$scope: $scope, $rootScope: $rootScope, entryService: entryServiceMock});
  }));

  it('should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should have a total property on $scope', function() {
    expect($scope.total).toBeDefined();
  });


  it('should update sum on $rootScope.$emit(newEntry)', function() {
    entryServiceMock.addEntry(2);
    $rootScope.$emit('newEntry', 2);
    $rootScope.$digest();
    
    expect($scope.total).toBe(2);
  });
});