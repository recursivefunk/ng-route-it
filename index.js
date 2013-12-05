var sysPath = require('path');

var parseIt = function(req) {
  var obj = req.path.split('/');
  var str = '/#';

  for(var i in obj) {
    var tmp = obj[ i ];
    if (tmp) {
      if ( tmp[ 0 ].indexOf(':') === 0 ) {
        var length = tmp.length;
        tmp = tmp.substring( 1 );
        tmp = req.params[ tmp ];
      }
      str += '/' + tmp;
    }
  }
  return str;
};

var pointsToStaticHtml = function(path) {
  var index = path.indexOf( '.html' );
  if ( index > -1 ) return index + 5;
};

module.exports = function(req) {
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
    return str = sysPath.join( staticFilePath, angularPath );
  } else {
    return parseIt( req );
  }
};

