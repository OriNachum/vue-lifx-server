<template>
  <div class="main-page">
    <div>Debug info: {{ getDebugInfo() }}</div>
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
import { INIT, GET_BULBS, GET_DEBUG_INFO } from '@/modules/mainPage';

export default {
  name: 'mainPage',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getBulbs: GET_BULBS,
      getDebugInfo: GET_DEBUG_INFO,
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
