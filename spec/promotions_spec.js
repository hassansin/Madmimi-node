var describe = require('Jody').describe,
    Madmimi = require('../lib/index.js');

var madmimi = "";
var email_options = {
      promotion_name:"Test Promotion",
      recipient:"Jimi Hendrix <jimi@electricladyland.com>",
      subject:"Test Promotion",
    from:"no-reply@guitargear.com",
    raw_html:"<html><head><title>Great promotion!</title></head><body>Cool guitar stuff[[tracking_beacon]]</body></html>"
};


describe("Promotions").
  beforeEach( function () {
    madmimi = new Madmimi("fake@email.com", "fake-api-key");
  }).  
  it("Should create http request for all promotions", function (atEnd) {
      var requestOptions; 
    
    madmimi.request = function (options, body) {
     requestOptions = options;
    };

    madmimi.promotions(function () {});

    atEnd(function () {
      requestOptions.host.should().beEqual('api.madmimi.com');
      requestOptions.port.should().beEqual('443');
      requestOptions.path.should().beEqual('/promotions.xml?username=fake%40email.com&api_key=fake-api-key');
      requestOptions.method.should().beEqual('GET');
    })
  });

