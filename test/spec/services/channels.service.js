'use strict';

describe('Service: channels.service', function () {

  // load the service's module
  beforeEach(module('tepeeWebApp'));

  // instantiate service
  var channels.service;
  beforeEach(inject(function (_channels.service_) {
    channels.service = _channels.service_;
  }));

  it('should do something', function () {
    expect(!!channels.service).toBe(true);
  });

});
