
var should = require('should');
var ngRoute = require('../index');

describe('Ng-Route-It', function(){

  // simulated request object
  var requests = {
    validRequestWithParams: {
      params: {
        foo: 'bar',
        test: 'blah'
      },
      path: '/home/:foo/path/:test'
    },

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
    },

    withPrefixHash: {
      params: {
        foo: 'bar'
      },
      path: '/path/to/:foo'
    }    
  };

  it('should correctly route a request with params', function (done){
    ngRoute
      .routeIt( requests.validRequestWithParams )
      .should
      .equal( '/#/home/bar/path/blah' );
    return done();
  });

  it('should correctly route a request with no', function (done){
    ngRoute
      .routeIt( requests.validRequestWithNoParams )
      .should
      .equal( '/#/path/to/profile' );
    return done();
  });  

  it('should correctly route an invalid request with empty parts', function (done){
    ngRoute
      .routeIt( requests.invalidRequestEmptyPathParts )
      .should
      .equal( '/#/path/to/something' );
    return done();
  });   

  it('should correctly route an invalid request with empty parts and params', function (done){
    ngRoute
      .routeIt( requests.invalidRequestEmptyPathPartsWithParams )
      .should
      .equal( '/#/path/to/something/bar' );
    return done();
  });   

  it('should correctly route a path for static files and ajax', function (done){
    ngRoute
      .routeIt( requests.staticWithAjax )  
      .should
      .equal( '/index.html/#/path/to/bar' );
    return done();
  });  

  it('should correctly route a path with a prefix hash', function (done){ 
    ngRoute
      .setPrefixHash('!')  
      .routeIt( requests.withPrefixHash )
      .should
      .equal( '#!/path/to/bar' )
    return done();
  });  

  it('should remove the prefix hash', function (done){
    ngRoute
      .removePrefixHash()
      .routeIt( requests.withPrefixHash )
      .should
      .equal( '/#/path/to/bar' );
    return done();
  });

});