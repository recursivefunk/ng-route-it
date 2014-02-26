
(function(){

  'use strict';

  var sysPath = require('path');
  var prefixHash;

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

  exports.routeAll = function(paths, app) {
    var newPaths = [];
    paths.forEach(function(p){
      app.get(p, function(req, res){
        var angPath = exports.routeIt( req );
        res.redirect( angPath );
        newPaths.push( angPath );
      });
    });
    return newPaths;
  };

  exports.testRouteAll = function(paths) {
    var newPaths = [];
    for (var i = 0; i < paths.length; i++) {
      var p = paths[ i ];
      var req = {};
      req.path = p;
      req.params = {};
      var newPath = exports.routeIt( req );
      newPaths.push( newPath );
    }
    return newPaths;
  };

})();


