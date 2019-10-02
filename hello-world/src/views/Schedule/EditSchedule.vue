<template>
  <div class='edit-schedule'>
    <div class='edit-schedule--header'>
      Edit action Id {{ action.Id }}
    </div>
    <div class='edit-schedule--form'>
      <div class='form--line'>
        Defined action to perform: <input v-model="action.Name" />
      </div>
      <div class='form--line'>
        Time to run: <input v-model="action.Time" />
      </div>
      <div class='form--line'>
        Days of Week: <input v-model="action.DaysOfWeek" />
      </div>
      <div class='form--line'>
        Is active: <input v-model="action.Active" />
      </div>
    </div>
    <div>
      <button @click="deleteScheduledAction(action)">Delete action</button>
      <button @click="modifyScheduledAction({ action })">Modify action</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
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
  computed: {
    ...mapGetters(moduleName, {
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      deleteScheduledAction: actions.DELETE_SCHEDULED_ACTION,
      modifyScheduledAction: actions.MODIFY_SCHEDULED_ACTION,
    }),
  },
};
</script>

<style lang="scss">
.edit-schedule {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &--header {
    text-decoration: underline;
    font-weight: 600;
  }

  &--form {
    display: inline;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form--line {
      padding-top: 0.1em;
      padding-bottom: 0.1em;
      text-align: left;
    }
  }
}
</style>
