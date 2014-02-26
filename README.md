

The problem:
You have a single page app routed via angular.js and you have html5Mode turned on. Like so

```javascript
  $locationProvider
    .html5Mode( true );

  $routeProvider
    .when('/', {templateUrl: 'partials/1.html', controller: 'MainCtrl'})
    .when('/people/:team/:id', {templateUrl: 'partials/partial1.html', controller: 'PersonCtrl'})
    .otherwise({redirectTo: '/'});
```

But you're serving that app using express (or a similar framework). You're server only knows about your one route at '/'.

Angular knows /people/:team/:id sends you to a person's profile but if a user hits that URL
via the browser URL naviagtion (or external link) your server throws a 404.

Just listen for your angular.js routes on the server and convert them using ng-route-it.

```javascript
  var ngRoute = require( 'ng-route-it' );

  app.get('/people/:team/:id', function(req, res) {
    var actualPath = ngRoute.routeIt( req );
    res.redirect( actualPath );
  });
```

You can use paths with static html at the root followed by your angular path

```javascript
  var routeIt = require( 'ng-route-it' );

  app.get('/index.html/:team/:id', function(req, res) {
    var actualPath = ngRoute.routeIt( req );
    res.redirect( actualPath );
  });
```

Using a prefix hash? No problem

```javascript
  // angular code
  $locationProvider
    .html5Mode( true )
    .hashPrefix( '!' );

  // in your server code
  var routeIt = require( 'ng-route-it' );

  app.get('/index.html/:team/:id', function(req, res) {
    var actualPath;
    actualPath =
      ngRoute
        .setPrefixHash( '!' )
        .routeIt( req );
    res.redirect( actualPath );
  });
```

Lots of paths? No problem, use routeAll
```javascript
  ngRoute.routeAll( [ '/view1', '/view2', '/path/to/view/:username' ], app );
```

To run tests

```
  grunt
```

That's it. Simple. More features coming soon...

