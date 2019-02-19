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
import { mapGetters } from '@/store/mainPage';

export default {
  name: 'main-page',
  components: {
  },
  data: {

  },
  computed: {
    ...mapGetters({
      getBulbs: 'getBulbs',
    }),
  },
};
</script>
