<template>
    <div class='supported-action'>
    <div class='supported-action--header'>
      Schedule action: {{ definedAction }}
    </div>
    <div class='supported-action--form'>
      <div>
        Time to run: <input v-model="timeToRun" />
      </div>
      <div>
        Day of Week: <input v-model="dayOfWeek" />
      </div>
    </div>
    <button @click="scheduleAction({ name: definedAction, timeToRun, dayOfWeek })">Schedule action</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  getters,
  actions,
} from '@/modules/schedule';

export default {
  name: 'scheduleAction',
  props: {
    definedAction: '',
  },
  data() {
    return {
      timeToRun: '',
      dayOfWeek: '',
    };
  },
  computed: {
    ...mapGetters(moduleName, {
      // defineAc: getters.GET_SUPPORTEDACTIONS,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      scheduleAction: actions.SCHEDULE_ACTION,
    }), 
  },
};

</script>
