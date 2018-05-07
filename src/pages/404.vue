<template lang="pug">
  .page.error-404
    h1 Hmmm, something's not right
    h2 Whoops, this is not the page you're looking for
</template>

<style lang="scss">
@import '../styles/variables';

.error-404 {
  text-align: center;
  padding: $padding-xxlarge $padding-default;

  h2 {
    color: $color-danger;
  }
}
</style>
