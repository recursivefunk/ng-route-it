'use strict';

var express = require( 'express' );
var restify = require( 'restify' );

exports.constructServer = function( type, port ) {
  port = port || 3000;
  type = type || 'express';
  var app;

  if ( type === 'express' ) {
    app = express();
    app.listen( port );
  } else if ( type === 'restify' ) {
    app = restify.createServer({
      name: 'test',
      version: '1.0.0'
    });
    app.listen( port );
  }
  return app;
};