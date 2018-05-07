<template lang="pug">
  .price(v-if="price")
    span.free.deal(v-if="price.new_list_price === 0") FREE!
    span(v-else)
      del.existing(v-if="price.existing_list_price > price.new_list_price") ${{ price.existing_list_price }}
      .deal ${{ price.new_list_price }}
</template>

<script>
export default {
  props: {
    price: Object, // TODO Prop Validation
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

@mixin deal {
  font-size: 26px;
  color: $color-success;
}

.price {
  .free {
    @include deal;
  }

  .existing {
    color: $color-fade;
  }

  .deal {
    @include deal;
  }
}
</style>
