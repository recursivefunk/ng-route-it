# New version breaks anything older than 0.2.0!

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

But you're serving that app using express. You're server only knows about your one route at '/'.

Angular knows /people/:team/:id sends you to a person's profile but if a user hits that URL
via the browser URL naviagtion (or external link) your server throws a 404.

Use ng-route-it as a third party middleware

```javascript
  var ngRoute = require( 'ng-route-it' );

  app.use( ngRoute.route() );

  // Now all of your angular routes will pass through the server to your angular app
  // which knows how to deal with them
```

Using a prefix hash? No problem

```javascript
  // angular code
  $locationProvider
    .html5Mode( true )
    .hashPrefix( '!' );

  // in your server code
  var routeIt = require( 'ng-route-it' );

  app.use( ngRoute.setPrefixHash( '!' ).route() );
```

Oh, you have some endpoints that return data or something that you need to have work as usual?
```javascript
  ngRoute.ignore( [ '^/api' ] );

  app.use( ngRoute.route() );

  // ngRouteIt will ignore this route
  app.get('/api/foo.json', function(res, res){
    res.send( { data: 'foo' } );
  });
```


To run tests

```
  grunt
```

