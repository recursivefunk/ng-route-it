
(function(){

  'use strict';

  var sysPath = require('path');
  var prefixHash;
  var managedRoutes = [];

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

  /**
   * DEPRECATED DO NOT USE
   * @param  {[type]} req [description]
   * @return {[type]}     [description]
   */
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

  /**
   * DEPRECATED DO NOT USE
   * @param  {[type]} paths [description]
   * @param  {[type]} app   [description]
   * @return {[type]}       [description]
   */
  exports.routeAll = function(paths, app) {
    var newPaths = [];
    var onRoute = function(req, res){
      var angPath = exports.routeIt( req );
      res.redirect( angPath );
      newPaths.push( angPath );
    };
    paths.forEach(function(p){
      if ( app.route && typeof app.route === 'function' ) {
        app
          .route( p )
          .get( onRoute );
      } else {
        app.get( p, onRoute );
      }
    });
    return newPaths;
  };

  exports.configure = function( _managedRoutes ) {
    managedRoutes = _managedRoutes || managedRoutes;
    return exports;
  };

  exports.route = function( req, res, next ) {
    var _path = req._parsedUrl.path;
    if ( managedRoutes.indexOf( _path ) > -1 ) {
      var angPath = exports.routeIt( req );
      res.redirect( '/' + sysPath.join( angPath ) );
    } else {
      next();
    }
  };

})();


