
module.exports = function(req) {
  var str = '/#';
  for(var i in req.params) {
    str += '/' + req.params[ i ];
  }
  return str;
}