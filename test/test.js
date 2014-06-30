
/* global describe:true, it:true, before: false */

(function(){

  'use strict';

  var should = require('should');
  var ngRoute = require('../index');
  var serverFactory = require( './serverFactory' );
  var request = require( 'request' );

  describe('Ng-Route-It with express', function() {

    var servers = [
      {
        instance: serverFactory.constructServer( 'express', 3000 ),
        port: 3000
      }
    ];

    before(function(done){
      servers.forEach(function(server){
        server.instance.get('/route', function(req, res){
          var angularRoute = ngRoute.routeIt( req );
          res.send( { path: angularRoute } );
        });
      });
      done();
    });

    it('should produce the correct angular route', function(done){
      request.get( 'http://localhost:3000/route', function(err, res, body){
        should.not.exist( err );
        var obj = JSON.parse( body );
        obj.should.have.property( 'path' );
        obj.path.should.equal( '/#/route' );
        done();
      });
    });

  });

}());