'use strict';

describe('Controller: ChannelsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('tepeeWebApp'));

  var ChannelsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChannelsControllerCtrl = $controller('ChannelsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChannelsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
