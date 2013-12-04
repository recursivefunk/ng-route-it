

The problem: 
You have a single page app routed via angular.js. You're serving that app using express (or a similar framework). Angular knows /person/:id sends you to a person's profile but if a user hits that URL
via the browser URL naviagtion your server throws a 404.

Just listen for your angular.js routes on the server and convert them using ng-route-it.

```javascript
  var routeIt = require('ng-route-it');

  app.get('/people/:team/:id', function(req, res) {
    var actualPath = routeIt( req );
    res.redirect( actualPath );
  });
```

That's it. Simple. More features coming soon...

