
var should = require('should');
var routeIt = require('../index');

describe('Ng-Route-It', function(){

  var requests = {
    // a valid path with params and immutable path parts
    validRequestWithParams: {
      params: {
        foo: 'bar',
        test: 'blah'
      },
      path: '/home/:foo/path/:test'
    },

    // valid request with no params present
    validRequestWithNoParams: {
      params: {},
      path: '/path/to/profile'
    },

    invalidRequestEmptyPathParts: {
      params: {},
      path: '//path/to//something'
    },

    invalidRequestEmptyPathPartsWithParams: {
      params: {
        foo: 'bar'
      },
      path: '//path/to//something//:foo'
    },

    staticWithAjax: {
      params: {
        foo: 'bar'
      },
      path: '/index.html/path/to/:foo'
    }    
  };

  it('should correctly route a request with params', function (done){
    var path = routeIt( requests.validRequestWithParams );
    path.should.equal( '/#/home/bar/path/blah' );
    return done();
  });

  it('should correctly route a request with no', function (done){
    var path = routeIt( requests.validRequestWithNoParams );
    path.should.equal( '/#/path/to/profile' );
    return done();
  });  

  it('should correctly route an invalid request with empty parts', function (done){
    var path = routeIt( requests.invalidRequestEmptyPathParts );
    path.should.equal( '/#/path/to/something' );
    return done();
  });   

  it('should correctly route an invalid request with empty parts and params', function (done){
    var path = routeIt( requests.invalidRequestEmptyPathPartsWithParams );
    path.should.equal( '/#/path/to/something/bar' );
    return done();
  });   

  it('should correctly route a path for static files and ajax', function (done){
    var path = routeIt( requests.staticWithAjax );
    path.should.equal( '/index.html/#/path/to/bar' );
    return done();
  });    

});