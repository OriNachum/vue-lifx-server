<template>
  <div class="main-page">
    <ul class="bulbs">
      <li v-for="bulb in getBulbs" :key="bulb.id">
        {{ bulb }}
      </li>
    </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import { INIT, GET_BULBS } from '@/modules/mainPage';

export default {
  name: 'mainPage',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getBulbs: GET_BULBS,
    }),
  },

  methods: {
    ...mapActions({
      init: INIT,
    }),
  },
  async mounted() {
    await this.init();
  },
};
</script>
