<template>
  <div class='supported-action'>
    {{ definedAction }}
  </div>  
</template>

<script>
export default {
  name: 'defineAction',
  props: {
    definedAction: '',
  },
}
</script>