<template>
  <div class='schedule-page'>
    <div class='schedule-page--add-new-item'>
      <button @click="defineAction()">
        + Define Action
      </button>
    </div>
    <div class='schedule-page--add-new-item'>
      <button @click="createScheduledAction()">+ Add schedule</button>
    </div>
    <div class='schedule-page--schedule schedule'>
        <table :values="getSchedule" class='schedule--table'>
          <thead class='table-head'>
          <tr class='table-head--row row'>
            <th v-for="column in columns" :key="column.id" class='table-head--row row--column'>
              {{ column.name }}
            </th>
          </tr>
          </thead>
          <tbody class='table-body'>
            <tr class='table-body--row row'
              v-for="action in getSchedule" :key="action.id"
              @click="editScheduledAction(action)">
                <td class='table-body--row row--column'>
                  {{ action.Name }}
                </td>
                <td class='table-body--row row--column'>
                  {{ action.Time }}
                </td>
                <td class='table-body--row row--column'>
                  {{ action.Date }} {{ action.DaysOfWeek }}
                </td>
                <td class='table-body--row row--column'>
                  {{ action.Repeating }}
                </td>
                <td class='table-body--row row--column'>
                  {{ action.Active }}
                </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  getters,
  actions,
} from '@/modules/schedule';

export default {
  name: 'schedulePage',
  data() {
    return {
      columns: [
        {
          id: 1,
          name: 'Name',
        }, {
          id: 2,
          name: 'Time',
        }, {
          id: 3,
          name: 'Date/DaysOfWeek',
        }, {
          id: 4,
          name: 'Repeating',
        }, {
          id: 5,
          name: 'Active',
        },
      ],
    };
  },
  components: {
  },
  computed: {
    ...mapGetters(moduleName, {
      getSchedule: getters.GET_SCHEDULE,
      getActions: getters.GET_ACTIONS,
      getSupportedActions: getters.GET_SUPPORTEDACTIONS,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      init: actions.INIT,
    }),
    defineAction() {
      const definedAction = {
        Name: '',
        Service: '',
        ActionId: '',
        Parameters: [['label1', 'helloWorld1']],
      };
      const supportedActions = this.getSupportedActions;
      this.$router.push({
        name: 'defineAction',
        params: { definedAction, supportedActions },
      });
    },
    editScheduledAction(action) {
      const definedActions = [...this.getActions];
      this.$router.push({
        name: 'editSchedule',
        params: { action, definedActions },
      });
    },
    createScheduledAction() {
      const action = { };
      const definedActions = [...this.getActions];
      const supportedActions = this.getSupportedActions;

      this.$router.push({
        name: 'editSchedule',
        params: { action, definedActions, supportedActions },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
.schedule-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .supported-actions{
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-start;
      .supported-actions--word__header {
        font-weight: 600;
      }
      .supported-actions--word {
        padding-right: 1em;
      }
  }
  .defined-actions {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    .defined-actions--word__header {
      font-weight: 600;
    }
    .defined-actions--word {
      padding-right: 1em;
    }
  }
  .schedule {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    .row--column {
      text-align: left;
    }
  }
}
</style>
