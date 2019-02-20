<template>
  <div class="main-page">
    <ul class="bulbs">
      <li v-for="bulb in getBulbs()" :key="bulb.id">
        {{ bulb }}
      </li>
    </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'mainPage',
  created: () => {
 //   init();
  },
  computed: {
    ...mapGetters({
      getBulbs: 'getBulbs',
    }),
  },
  actions: {
    ...mapActions('mainPage', {
      init: 'init',
    }),
  },
};
</script>
