'use strict';

describe('Controller: MessagesControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('tepeeWebApp'));

  var MessagesControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessagesControllerCtrl = $controller('MessagesControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MessagesControllerCtrl.awesomeThings.length).toBe(3);
  });
});
