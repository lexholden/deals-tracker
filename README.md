# deals-tracker

An experiment with the MyTime API, written in VueJS using Vuex as a centralized state management.

To make this interesting, having never used Vuex before, I tried to invent a standard for Vuex inspired by the [ducks](https://github.com/erikras/ducks-modular-redux) redux standard. Seperating similar concerns (e.g. companies) into separate folders (e.g. actions, reducers, getters) always seemed counter-intuitive, rather than storing the lifecycle functions of a given entity type as close as possible.

## Limitations

- There seem to be some performance issues with several APIs, most notably `GET /companies/:id/deals` which can take ~20 seconds to respond. Even the best attempt at Optimistic UI will be stunted by this.
- No API to get a list of companies makes a static list pulled from config.yml on the central dashboard the only option, which feels like a clunky antipattern, a `GET /companies` would be useful.

## Features

- Central dashboard with a link to a suggested company to explore details of
- Company page which loads company details and locations
  - Click a location to see the deals at that location
- Basic UI components/styles taken from a material design library
  - Additional components
- Basic notifications, mostly for failure states, with a material design snackbar component

## Enhancements

Before this could be a viable MVP, the following would need improving

- Improve API speed
- 

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
