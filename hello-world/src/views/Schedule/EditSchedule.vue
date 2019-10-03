<template>
  <div class='edit-schedule'>
    <div class='edit-schedule--header'>
      Edit action id {{ action.Id }} schedule
    </div>
    <div class='edit-schedule--form'>
      <div class='form--line'>
        ActionId: <v-Select v-model="action.Name" :options="definedActions" ></v-Select>
      </div>
      <div class='form--line' v-if="action.Parameters && action.Parameters.label">
        Parameters: 
        <div class='form--line line--parameters' v-for="parameter in Object.entries(action.Parameters)" :key="parameter[0]">
          {{ parameter[0] }}: {{ parameter[1] }}
        </div>
      </div>
      <div class='form--line'>
        Time to run: <input v-model="action.Time" />
      </div>
      <div class='form--line'>
        Days of week: 
        <v-Select multiple v-model="action.DaysOfWeek" :options="['0','1','2','3','4','5','6']" ></v-Select>
        <!--<input v-model="action.DaysOfWeek" />-->
      </div>
      <div class='form--line'>
        Specific date: <input v-model="action.Date" />
      </div>
      <div class='form--line'>
        Is repeating: <input v-model="action.Repeating" />
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
import 'vue-select/dist/vue-select.css';
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  actions,
} from '@/modules/schedule';

import vSelect from 'vue-select';

export default {
  name: 'editSchedule',
  components: {
    vSelect,
  },
  props: {
    action: { },
    definedActions: null,
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
      .line--parameters {
        margin-left:1em;
      }
    }
  }
}
</style>
