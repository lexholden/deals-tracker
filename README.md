# deals-tracker

An experiment with the MyTime API, written in VueJS using Vuex as a centralized state management.

To make this interesting, having never used Vuex before, I tried to invent a standard for Vuex inspired by the [ducks](https://github.com/erikras/ducks-modular-redux) redux standard. Seperating similar concerns (e.g. companies) into separate folders (e.g. actions, reducers, getters) always seemed counter-intuitive, preferred is to store the lifecycle functions of a given entity type as close together as possible.

## Limitations

- There seem to be some performance issues with several APIs, most notably `GET /companies/:id/deals` which can take ~20 seconds to respond. Even the best attempt at Optimistic UI will be stunted by this.
- No API to get a list of companies makes a static list pulled from config.yml on the central dashboard the only osption, which feels like a clunky antipattern, a `GET /companies` would be useful.
- With no useful metadata (e.g. descriptions) to provide context, the UX feels very clunky

## Features

- Central dashboard with a link to a suggested company to explore details of
- Company page which loads company details and locations
  - Click a location to see the deals at that location
- Basic UI components/styles taken from a material design library
  - Additional components
- Centralised notifications architecture, currently mostly for failure states, with the material design snackbar component
- Track pricing for all available deal variations, including noting of free offers and discounted offers

## Enhancements

Before this could be a viable, customer facing MVP, the following would need improving

- Improve API speed
- Remove unused material components, only ship code actually used
- Some addresses seem fake, otherwise would plot them on a google map on the company page
- Add useful metadata to some API responses, e.g. deal count. Loading all deals for a location just to get a count is inefficient
- Tests for company/notifications vuex modules, with API stubs
- e2e tests with testcafe
- Improve caching layer - whilst the data layer is caching long API requests, it still loads them again in the background. Would only reload after more than ~30 seconds since data was first loaded
- Data sanitization - given only one location to test against (seems others require authentication and are blocked by CORS) no tests were run against other locations, testing conditions like empty deals ("This location has no deals") was not possible
- More bespoke error messages, currently just show the API errors directly

## Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
