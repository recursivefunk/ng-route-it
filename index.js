

module.exports = function(req) {
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
}