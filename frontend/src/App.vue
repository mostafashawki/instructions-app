<template>
  <router-view />
</template>
<script>
  import { defineComponent, provide } from 'vue';
  import store from './store';

  export default defineComponent({
    setup() {
      provide('store', store);
    },
    name: 'App',
  });
</script>
