<template>
    <div class='edit-schedule'>
    <div class='edit-schedule--header'>
      Schedule action: {{ action }}
    </div>
    <div class='edit-schedule--form'>
      <div class='form--name'>
        Name: <input :model="name"/>
      </div>
      <div>
        Time to run: <input :model="timeToRun" />
      </div>
      <div>
        Day of Week: <input :model="dayOfWeek" />
      </div>
    </div>
    <button @click="createAction(name, props)">Create action</button>
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
  name: 'editSchedule',
  props: {
    action: { },
  },
  data() {
    return {
      timeToRun: '',
      dayOfWeek: '',
    };
  },
}
</script>