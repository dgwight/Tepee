'use strict';

describe('Service: users.service', function () {

  // load the service's module
  beforeEach(module('tepeeWebApp'));

  // instantiate service
  var users.service;
  beforeEach(inject(function (_users.service_) {
    users.service = _users.service_;
  }));

  it('should do something', function () {
    expect(!!users.service).toBe(true);
  });

});
