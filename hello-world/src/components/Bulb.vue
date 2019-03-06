<template>
<div class='bulb'>
  <p>
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
};
// Put here how to design each light in a page
</script>
