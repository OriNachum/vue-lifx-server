<template>
  <div class='define-action'>
    {{ supportedAction }}
  </div>  
</template>

<script>
export default {
  name: 'defineAction',
  props: {
    supportedAction: '',
  },
}
</script>