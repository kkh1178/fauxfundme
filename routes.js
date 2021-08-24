// Second set of paranthesis are to execute the function immediately
const routes = require('next-routes')();

/* add is how we add a new map routing; : is a wildcard to the component; the second argument 
is which component we want to show at the route;
the new page will accidentally get caught in our wildcard, so we will add that route first.
*/
routes
    .add('/fundraisers/new', '/fundraisers/new')
    .add('/fundraisers/:address', "/fundraisers/show");

// exports helpers that will allow us to navigate users around our application
module.exports = routes;