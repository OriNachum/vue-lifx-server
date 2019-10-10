<template>
<div class='bulb'>
  <p>
    <font-awesome-icon :icon="getBulbIconState"></font-awesome-icon>
    <font-awesome-icon :icon="['far', 'lightbulb']"></font-awesome-icon>
    label: {{ bulb.label }}; address: {{ bulb.address }}
  </p>
</div>
</template>

<script>
export default {
  name: 'bulb',
  props: {
    bulb: Object,
  },
  data() {
    return {

      /*
     bulb: {
        Label: '',
        Address: '',
        Product: '',
        Version: '',
        Power: '',
        Temperature: '',
        Brightness: '',
        ColorHue: '',
        ColorSaturation: '',
        LastVerifiedState: '',
        StateVerificationTimeUtc: '',
      },
      */
    };
  },
  computed: {
    getBulbIconState() {
      let iconState = 'fas';
      if (this.bulb.Power.Value == 0) {
        iconState = 'far';
      }
      return [iconState, 'lightbulb'];
    },
  },
};
// Put here how to design each light in a page
</script>
