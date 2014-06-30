
(function(){

  'use strict';

  var sysPath = require('path');
  var prefixHash;
  var managedRoutes = [];
  var ignore = [];

  var parseIt = function(req) {
    var obj = req.path.split('/');
    var str = '/#';

    if ( prefixHash ) {
      str = '#' + prefixHash + '/';
    }

    for(var i in obj) {
      var tmp = obj[ i ];
      if ( tmp ) {
        if ( tmp[ 0 ].indexOf( ':' ) === 0 ) {
          var length = tmp.length;
          tmp = tmp.substring( 1 );
          tmp = req.params[ tmp ];
        }
        str += '/' + tmp;
      }
    }

    return str.replace( /\/\//, '/' );
  };

  var pointsToStaticHtml = function(path) {
    var index = path.indexOf( '.html' );
    if ( index > -1 ) {
      return index + 5;
    }
  };

  exports.ignore = function( ignoreRoutes ) {
    ignore = ignoreRoutes || ignore;
    return exports;
  };

  exports.removePrefixHash = function() {
    prefixHash = null;
    return exports;
  };

  exports.setPrefixHash = function(str) {
    if ( str && str !== '' ) {
      prefixHash = str;
    }
    return exports;
  };

  exports.routeIt = function(req) {
    var path = req.path;
    var staticIndexEnd = pointsToStaticHtml( path );
    if ( staticIndexEnd ) {
      var staticFilePath = path.substring( 0, staticIndexEnd );
      var ajaxPath = path.substring( staticIndexEnd );
      var fakeReq = {
        params: req.params,
        path: ajaxPath
      };
      var angularPath = parseIt( fakeReq );
      return sysPath.join( staticFilePath, angularPath );
    } else {
      return parseIt( req );
    }
  };

  exports.route = function() {
    return function( req, res, next ) {
      var _path = req._parsedUrl.path;
      var shouldIgnorePath = shouldIgnore( _path );
      if ( _path === '/' || shouldIgnorePath ) {
        return next();
      }
      else {
        var foo = exports.routeIt( req );
        res.redirect( '/' + foo );
      }
    };
  };

  function shouldIgnore( p ) {
    for ( var i = 0; i < ignore.length; i++ ) {
      if ( new RegExp( ignore[ i ] ).test( p ) ) {
        return true;
      }
    }
  }

})();


