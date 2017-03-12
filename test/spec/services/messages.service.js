'use strict';

describe('Service: messages.service', function () {

  // load the service's module
  beforeEach(module('tepeeWebApp'));

  // instantiate service
  var messages.service;
  beforeEach(inject(function (_messages.service_) {
    messages.service = _messages.service_;
  }));

  it('should do something', function () {
    expect(!!messages.service).toBe(true);
  });

});
